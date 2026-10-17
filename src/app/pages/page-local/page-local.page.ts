import { Component, OnInit } from '@angular/core';
import { AppData, Match, Team } from '../../core/models/app-data.models';
import { SportsDataService } from '../../core/services/sports-data.service';

@Component({ selector: 'app-page-local', templateUrl: './page-local.page.html', styleUrls: ['./page-local.page.scss'] })
export class PageLocalPage implements OnInit {
  data?: AppData;
  liveMatches: Match[] = [];
  nextMatches: Match[] = [];
  loading = true;
  error = false;

  constructor(private sports: SportsDataService) {}

  ngOnInit(): void {
    this.sports.getSnapshot().subscribe({
      next: data => {
        this.data = data;
        this.liveMatches = data.matches.filter(match => match.status === 'live');
        this.nextMatches = data.matches.filter(match => match.status !== 'live').slice(0, 4);
        this.loading = false;
      },
      error: () => { this.error = true; this.loading = false; }
    });
  }

  team(id: string): Team | undefined { return this.data ? this.sports.getTeam(this.data, id) : undefined; }
  statusLabel(match: Match): string {
    return match.status === 'live' ? `${match.minute}'` : match.status === 'finished' ? 'Finalizado' : 'Próximo';
  }
}
