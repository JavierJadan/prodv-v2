import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppData, League, Match, Standing, Team, TopScorer } from '../models/app-data.models';

@Injectable({ providedIn: 'root' })
export class SportsDataService {
  private readonly data$: Observable<AppData> = this.http
    .get<AppData>('assets/mocks/app-data.json')
    .pipe(shareReplay(1));

  constructor(private http: HttpClient) {}

  getSnapshot(): Observable<AppData> { return this.data$; }
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
}
