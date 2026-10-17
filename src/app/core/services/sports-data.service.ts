import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, concat, Observable, of, throwError, timer } from 'rxjs';
import { catchError, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AppData, League, Match, Standing, Team, TopScorer } from '../models/app-data.models';
import { ApiCacheService } from './api-cache.service';

@Injectable({ providedIn: 'root' })
export class SportsDataService {
  private readonly cacheKey = 'sports-snapshot';
  private readonly refresh$ = new BehaviorSubject<void>(undefined);

  private readonly data$: Observable<AppData> = this.refresh$.pipe(
    switchMap(() => timer(0, environment.apiCacheTtlMs)),
    switchMap(() => this.loadSnapshot()),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(private http: HttpClient, private cache: ApiCacheService) {}

  getSnapshot(): Observable<AppData> { return this.data$; }
  refresh(): void { this.cache.remove(this.cacheKey); this.refresh$.next(); }
  getLeagues(): Observable<League[]> { return this.data$.pipe(map(data => data.leagues)); }
  getTeams(): Observable<Team[]> { return this.data$.pipe(map(data => data.teams)); }
  getMatches(): Observable<Match[]> { return this.data$.pipe(map(data => data.matches)); }
  getMatchesByLeague(leagueId: string): Observable<Match[]> {
    return this.data$.pipe(map(data => data.matches.filter(match => match.leagueId === leagueId)));
  }
  getStandings(leagueId: string): Observable<Standing[]> {
    return this.data$.pipe(map(data => data.standings.filter(table => table.leagueId === leagueId)));
  }
  getTopScorers(leagueId: string): Observable<TopScorer[]> {
    return this.data$.pipe(map(data => data.topScorers.filter(player => player.leagueId === leagueId)));
  }
  getTeam(data: AppData, teamId: string): Team | undefined {
    return data.teams.find(team => team.id === teamId);
  }

  private loadSnapshot(): Observable<AppData> {
    const cached = this.cache.read<AppData>(this.cacheKey, environment.apiCacheVersion);
    if (cached?.fresh) { return of(cached.data); }

    const request$ = this.http.get<AppData>(environment.sportsDataUrl).pipe(
      tap(data => this.cache.write(this.cacheKey, data, environment.apiCacheTtlMs, environment.apiCacheVersion)),
      catchError(error => cached ? of(cached.data) : throwError(error))
    );

    // Stale-while-revalidate: entrega la copia vencida y luego emite la actualizada.
    return cached ? concat(of(cached.data), request$) : request$;
  }
}
