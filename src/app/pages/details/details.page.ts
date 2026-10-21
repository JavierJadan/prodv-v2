import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppData, Match, Team } from '../../core/models/app-data.models';
import { SportsDataService } from '../../core/services/sports-data.service';

@Component({ selector: 'app-details', templateUrl: './details.page.html', styleUrls: ['./details.page.scss', './details-enhancements.scss'] })
export class DetailsPage implements OnInit {
  data?: AppData;
  match?: Match;
  detail: any;
  segment = 'stats';
  lineupSide: 'home' | 'away' = 'home';
  loading = true;
  error = false;

  constructor(private route: ActivatedRoute, private sports: SportsDataService) {}

  ngOnInit(): void {
    const leagueId = this.route.snapshot.paramMap.get('leagueId');
    const id = this.route.snapshot.paramMap.get('id');
    if (!leagueId || !id) { this.loading = false; this.error = true; return; }
    this.sports.getMatchDetail(leagueId, id).subscribe({
      next: data => {
        this.data = data;
        this.match = data.matches[0];
        this.detail = data.matchDetails[id];
        this.segment = this.hasStats ? 'stats' : this.hasEvents ? 'events' : 'lineups';
        if (!this.hasLineup('home') && this.hasLineup('away')) { this.lineupSide = 'away'; }
        this.loading = false;
      },
      error: () => { this.loading = false; this.error = true; }
    });
  }

  get hasStats(): boolean {
    return ['possession', 'shots', 'shotsOnTarget', 'corners', 'fouls'].some(key =>
      typeof this.detail?.[key]?.home === 'number' || typeof this.detail?.[key]?.away === 'number');
  }

  get hasEvents(): boolean { return Array.isArray(this.detail?.events) && this.detail.events.length > 0; }

  get hasLineups(): boolean {
    return this.hasLineup('home') || this.hasLineup('away');
  }

  hasLineup(side: 'home' | 'away'): boolean {
    return Array.isArray(this.detail?.lineups?.[side]?.players) && this.detail.lineups[side].players.length > 0;
  }

  get hasDetail(): boolean { return this.hasStats || this.hasEvents || this.hasLineups; }

  get unavailableTitle(): string {
    if (this.match?.status === 'live') { return 'Detalle en preparación'; }
    if (this.match?.status === 'finished') { return 'Detalle pendiente de publicación'; }
    return 'Información próximamente';
  }

  get unavailableMessage(): string {
    if (this.match?.status === 'live') { return 'El partido está en vivo. Las estadísticas y eventos aparecerán cuando estén disponibles.'; }
    if (this.match?.status === 'finished') { return 'El resultado ya está disponible, pero todavía no se han publicado estadísticas, eventos o alineaciones.'; }
    return 'Las alineaciones y estadísticas estarán disponibles cuando se publiquen o comience el partido.';
  }

  team(id: string): Team | undefined { return this.data ? this.sports.getTeam(this.data, id) : undefined; }
}
