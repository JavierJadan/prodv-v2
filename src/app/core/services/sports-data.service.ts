import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AppData, League, Match, Standing, Team, TopScorer } from '../models/app-data.models';
import { ApiCacheService } from './api-cache.service';

interface ApiPayload extends Partial<AppData> {
  meta: AppData['meta'] & { current_page?: number; last_page?: number; per_page?: number; total?: number };
}

@Injectable({ providedIn: 'root' })
export class SportsDataService {
  private readonly memory = new Map<string, { expiresAt: number; value$: Observable<ApiPayload> }>();

  constructor(private http: HttpClient, private cache: ApiCacheService) {}

  getLeagues(filters: { status?: string; season?: number; search?: string } = {}): Observable<League[]> {
    let params = new HttpParams().set('per_page', '100');
    Object.keys(filters).forEach(key => {
      const value = (filters as any)[key];
      if (value !== undefined && value !== '') { params = params.set(key, String(value)); }
    });
    return this.cachedGet('/leagues', environment.catalogCacheTtlMs, params)
      .pipe(map(payload => (payload.leagues || []).map(league => this.withDisplayFormat(league))));
  }

  getLeagueOverview(leagueId: string): Observable<AppData> {
    return this.cachedGet(`/leagues/${leagueId}/overview`, environment.overviewCacheTtlMs)
      .pipe(map(payload => this.normalize(payload)));
  }

  getMatchDetail(leagueId: string, matchId: string): Observable<AppData> {
    return this.cachedGet(`/leagues/${leagueId}/matches/${matchId}`, environment.matchCacheTtlMs)
      .pipe(map(payload => this.normalize(payload)));
  }

  getMatchesByLeague(leagueId: string, filters: Record<string, string | number> = {}): Observable<Match[]> {
    let params = new HttpParams().set('per_page', '100');
    Object.keys(filters).forEach(key => params = params.set(key, String(filters[key])));
    return this.cachedGet(`/leagues/${leagueId}/matches`, environment.matchesCacheTtlMs, params)
      .pipe(map(payload => payload.matches || []));
  }

  getStandings(leagueId: string): Observable<Standing[]> {
    return this.cachedGet(`/leagues/${leagueId}/standings`, environment.overviewCacheTtlMs)
      .pipe(map(payload => payload.standings || []));
  }

  getTopScorers(leagueId: string): Observable<TopScorer[]> {
    return this.cachedGet(`/leagues/${leagueId}/top-scorers`, environment.overviewCacheTtlMs)
      .pipe(map(payload => payload.topScorers || []));
  }

  refreshAll(): void { this.memory.clear(); this.cache.clear(); }

  getLeagueStatusLabel(status?: string): string {
    const normalized = (status || '').trim().toLowerCase();
    const labels: Record<string, string> = {
      active: 'En curso',
      upcoming: 'Próximamente',
      scheduled: 'Próximamente',
      finished: 'Finalizado',
      completed: 'Finalizado',
      paused: 'Pausado',
      cancelled: 'Cancelado',
      draft: 'Borrador'
    };
    if (labels[normalized]) { return labels[normalized]; }
    const readable = normalized.replace(/[_-]+/g, ' ').trim();
    return readable ? readable.charAt(0).toUpperCase() + readable.slice(1) : 'Estado no disponible';
  }

  getTeam(data: AppData, teamId: string): Team | undefined {
    return data.teams.find(team => team.id === teamId);
  }

  hasMatchDetail(data: AppData | undefined, matchId: string): boolean {
    const detail = data?.matchDetails?.[matchId];
    if (!detail) { return false; }
    const statKeys = ['possession', 'shots', 'shotsOnTarget', 'corners', 'fouls'];
    const hasStats = statKeys.some(key =>
      typeof detail[key]?.home === 'number' || typeof detail[key]?.away === 'number');
    const hasEvents = Array.isArray(detail.events) && detail.events.length > 0;
    const hasLineups = ['home', 'away'].some(side =>
      Array.isArray(detail.lineups?.[side]?.players) && detail.lineups[side].players.length > 0);
    return hasStats || hasEvents || hasLineups;
  }

  private cachedGet(path: string, ttlMs: number, params = new HttpParams()): Observable<ApiPayload> {
    const query = params.toString();
    const key = `${path}${query ? `?${query}` : ''}`;
    const existing = this.memory.get(key);
    if (existing && Date.now() < existing.expiresAt) { return existing.value$; }
    if (existing) { this.memory.delete(key); }

    const cached = this.cache.read<ApiPayload>(key, environment.apiCacheVersion);
    if (cached?.fresh) {
      const value$ = of(cached.data).pipe(shareReplay(1));
      this.memory.set(key, { expiresAt: Date.now() + ttlMs, value$ });
      return value$;
    }

    const request$ = this.http.get<ApiPayload>(`${environment.apiBaseUrl}${path}`, { params }).pipe(
      tap(data => this.cache.write(key, data, ttlMs, environment.apiCacheVersion)),
      catchError(error => {
        if (cached) { return of(cached.data); }
        if (environment.useMockDataOnApiError) { return this.mockPayload(path, params); }
        return throwError(error);
      }),
      shareReplay(1)
    );
    this.memory.set(key, { expiresAt: Date.now() + ttlMs, value$: request$ });
    return request$;
  }

  private mockPayload(path: string, params: HttpParams): Observable<ApiPayload> {
    return this.http.get<ApiPayload>('assets/mocks/app-data.json').pipe(map(payload => {
      const leagueMatch = path.match(/^\/leagues\/([^/]+)(?:\/overview)?$/);
      const matchDetail = path.match(/^\/leagues\/([^/]+)\/matches\/([^/]+)$/);
      const leagueMatches = path.match(/^\/leagues\/([^/]+)\/matches$/);

      if (path === '/leagues') {
        const status = params.get('status');
        const search = (params.get('search') || '').toLowerCase();
        return {
          ...payload,
          leagues: (payload.leagues || []).filter(league =>
            (!status || league.status === status) &&
            (!search || league.name.toLowerCase().includes(search) || league.shortName.toLowerCase().includes(search)))
        };
      }

      if (matchDetail) {
        const [, leagueId, matchId] = matchDetail;
        return this.mockLeaguePayload(payload, leagueId, matchId);
      }

      if (leagueMatches) {
        const leagueId = leagueMatches[1];
        const status = params.get('status');
        return {
          ...payload,
          leagues: (payload.leagues || []).filter(league => league.id === leagueId),
          matches: (payload.matches || []).filter(match => match.leagueId === leagueId && (!status || match.status === status))
        };
      }

      if (leagueMatch) { return this.mockLeaguePayload(payload, leagueMatch[1]); }
      return payload;
    }));
  }

  private mockLeaguePayload(payload: ApiPayload, leagueId: string, matchId?: string): ApiPayload {
    const matches = (payload.matches || []).filter(match => match.leagueId === leagueId && (!matchId || match.id === matchId));
    const teamIds = new Set(matches.reduce<string[]>((ids, match) => ids.concat(match.home.teamId, match.away.teamId), []));
    return {
      ...payload,
      leagues: (payload.leagues || []).filter(league => league.id === leagueId),
      teams: (payload.teams || []).filter(team => teamIds.has(team.id)),
      matches,
      standings: (payload.standings || []).filter(standing => standing.leagueId === leagueId),
      topScorers: (payload.topScorers || []).filter(scorer => scorer.leagueId === leagueId),
      matchDetails: matchId && payload.matchDetails?.[matchId]
        ? { [matchId]: payload.matchDetails[matchId] }
        : payload.matchDetails || {}
    };
  }

  private normalize(payload: ApiPayload): AppData {
    return {
      meta: payload.meta,
      leagues: (payload.leagues || []).map(league => this.withDisplayFormat(league)),
      teams: payload.teams || [],
      matches: payload.matches || [],
      standings: payload.standings || [],
      topScorers: payload.topScorers || [],
      matchDetails: payload.matchDetails || {}
    };
  }

  private withDisplayFormat(league: League): League {
    const labels: Record<string, string> = {
      league: 'Liga',
      groups: 'Fase de grupos',
      group_stage: 'Fase de grupos',
      knockout: 'Eliminación directa',
      groups_and_knockout: 'Grupos y eliminación directa',
      round_robin: 'Todos contra todos',
      double_round_robin: 'Todos contra todos (ida y vuelta)',
      cup: 'Copa'
    };
    const raw = (league.format || '').trim();
    const readable = labels[raw.toLowerCase()] || raw.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
    const format = readable ? readable.charAt(0).toUpperCase() + readable.slice(1) : 'Formato por definir';
    return { ...league, format };
  }
}
