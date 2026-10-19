import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppData, League, Match, Team } from '../../core/models/app-data.models';
import { SportsDataService } from '../../core/services/sports-data.service';

@Component({ selector: 'app-page-internacional', templateUrl: './page-internacional.page.html', styleUrls: ['./page-internacional.page.scss', './page-internacional-enhancements.scss'] })
export class PageInternacionalPage implements OnInit {
  data?: AppData;
  leagues: League[] = [];
  selectedLeagueId = '';
  allMatches: Match[] = [];
  matches: Match[] = [];
  filter = 'all';
  loading = true;

  constructor(private sports: SportsDataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sports.getLeagues({ status: 'active' }).subscribe(leagues => {
      this.leagues = leagues;
      if (!leagues.length) { this.loading = false; return; }
      this.route.queryParamMap.subscribe(params => {
        const requestedFilter = params.get('status');
        const requestedLeague = params.get('league');
        this.filter = ['live', 'scheduled', 'finished'].includes(requestedFilter || '') ? requestedFilter as string : 'all';
        this.selectLeague(requestedLeague === 'all' ? 'all' : leagues.find(item => item.id === requestedLeague)?.id || leagues[0].id);
      });
    });
  }

  changeLeague(event: Event): void {
    const id = (event as CustomEvent).detail?.value;
    if (id) { this.selectLeague(id); }
  }

  changeFilter(event: Event): void {
    this.filter = (event as CustomEvent).detail?.value || 'all';
    this.apply();
  }

  selectLeague(id: string): void {
    this.selectedLeagueId = id;
    this.loading = true;
    if (id !== 'all') {
      this.sports.getLeagueOverview(id).subscribe(data => this.setData([data]));
      return;
    }
    forkJoin(this.leagues.map(league => this.sports.getLeagueOverview(league.id).pipe(catchError(() => of(undefined)))))
      .subscribe(packs => this.setData(packs.filter((pack): pack is AppData => Boolean(pack))));
  }

  apply(): void {
    this.matches = this.allMatches
      .filter(match => this.filter === 'all' || match.status === this.filter)
      .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
  }

  team(id: string): Team | undefined { return this.data ? this.sports.getTeam(this.data, id) : undefined; }
  league(id: string): League | undefined { return this.leagues.find(item => item.id === id); }

  private setData(packs: AppData[]): void {
    if (!packs.length) { this.data = undefined; this.allMatches = []; this.apply(); this.loading = false; return; }
    this.data = {
      ...packs[0],
      leagues: this.leagues,
      teams: this.unique(packs.reduce((all, item) => all.concat(item.teams), []), 'id'),
      matches: this.unique(packs.reduce((all, item) => all.concat(item.matches), []), 'id'),
      standings: [],
      topScorers: [],
      matchDetails: {}
    };
    this.allMatches = this.data.matches;
    this.apply();
    this.loading = false;
  }

  private unique<T>(items: T[], key: keyof T): T[] {
    return Array.from(new Map(items.map(item => [item[key], item])).values());
  }
}
