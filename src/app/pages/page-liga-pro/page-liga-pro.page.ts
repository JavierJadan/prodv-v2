import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppData, CompetitionStage, League, Match, Standing, Team, TopScorer } from '../../core/models/app-data.models';
import { SportsDataService } from '../../core/services/sports-data.service';
import { MatchNavigationService } from '../../core/services/match-navigation.service';

interface NavigationOption {
  value: string;
  stage: CompetitionStage;
  round: number;
  label: string;
  disabled: boolean;
}

@Component({ selector: 'app-page-liga-pro', templateUrl: './page-liga-pro.page.html', styleUrls: ['./page-liga-pro.page.scss'] })
export class PageLigaProPage implements OnInit {
  data?: AppData;
  leagues: League[] = [];
  selected?: League;
  selectedStage?: CompetitionStage;
  tables: Standing[] = [];
  scorers: TopScorer[] = [];
  stageMatches: Match[] = [];
  matches: Match[] = [];
  groups: string[] = [];
  selectedGroup = '';
  segment = 'matches';
  round = 1;
  loading = true;
  error = false;
  private readonly overviews = new Map<string, AppData>();

  constructor(private sports: SportsDataService, private matchNavigation: MatchNavigationService) {}

  ngOnInit(): void {
    this.sports.getLeagues({ status: 'active' }).subscribe({
      next: leagues => {
        if (!leagues.length) { this.leagues = []; this.loading = false; return; }
        forkJoin(leagues.map(league => this.sports.getLeagueOverview(league.id).pipe(catchError(() => of(undefined)))))
          .subscribe(packs => {
            packs.forEach((pack, index) => { if (pack) { this.overviews.set(leagues[index].id, pack); } });
            this.leagues = [...leagues].sort((a, b) => Number(this.hasCompleteContent(b.id)) - Number(this.hasCompleteContent(a.id)));
            this.select(this.leagues[0]);
          });
      },
      error: () => { this.error = true; this.loading = false; }
    });
  }

  select(league: League): void {
    this.selected = league;
    this.selectedStage = league.stages.find(stage => stage.id === league.currentStage) || league.stages[0];
    this.round = league.currentRound;
    this.loading = true;
    this.error = false;
    this.data = undefined;
    const cached = this.overviews.get(league.id);
    if (cached) {
      this.applyLeagueData(cached);
      return;
    }
    this.sports.getLeagueOverview(league.id).subscribe({
      next: data => { this.overviews.set(league.id, data); this.applyLeagueData(data); },
      error: () => { this.error = true; this.loading = false; }
    });
  }

  get allNavigationOptions(): NavigationOption[] {
    return (this.selected?.stages || []).reduce<NavigationOption[]>((options, stage) => {
      const rounds = Array.from(new Set((this.data?.matches || [])
        .filter(match => match.leagueId === this.selected?.id && match.stage === stage.id)
        .map(match => match.round))).sort((a, b) => a - b);
      if (!rounds.length) {
        options.push({ value: `${stage.id}:1`, stage, round: 1, label: `${stage.name} (Próximamente)`, disabled: true });
        return options;
      }
      options.push(...rounds.map(round => ({
        value: `${stage.id}:${round}`,
        stage,
        round,
        label: this.navigationLabel(stage, round),
        disabled: false
      })));
      return options;
    }, []);
  }

  get navigationOptions(): NavigationOption[] {
    return this.isLeagueCompetition
      ? this.allNavigationOptions.filter(option => option.stage.id === this.selectedStage?.id)
      : this.allNavigationOptions;
  }

  get navigationValue(): string { return `${this.selectedStage?.id || ''}:${this.round}`; }
  get availableOptions(): NavigationOption[] { return this.navigationOptions.filter(option => !option.disabled); }
  get navigationIndex(): number { return this.availableOptions.findIndex(option => option.value === this.navigationValue); }
  get canGoPrevious(): boolean { return this.navigationIndex > 0; }
  get canGoNext(): boolean { return this.navigationIndex >= 0 && this.navigationIndex < this.availableOptions.length - 1; }
  get isKnockout(): boolean { return this.selectedStage?.type === 'knockout'; }
  get isLeagueCompetition(): boolean {
    return this.selected?.format.toLowerCase() === 'liga' || Boolean(this.selected?.stages.some(stage => stage.type === 'league'));
  }

  get visibleTables(): Standing[] {
    return this.selectedGroup ? this.tables.filter(table => table.group === this.selectedGroup) : this.tables;
  }

  get visibleScorers(): TopScorer[] {
    if (!this.selectedGroup) { return this.scorers; }
    return this.scorers.filter(player => this.groupForTeam(player.teamId) === this.selectedGroup);
  }

  changeNavigation(event: Event): void {
    const value = (event as CustomEvent<{ value?: string }>).detail.value;
    const option = this.navigationOptions.find(item => item.value === value && !item.disabled);
    if (option) { this.applyNavigation(option); }
  }

  moveNavigation(step: number): void {
    const option = this.availableOptions[this.navigationIndex + step];
    if (option) { this.applyNavigation(option); }
  }

  selectStage(stage: CompetitionStage): void {
    if (!this.hasStageMatches(stage)) { return; }
    const options = this.allNavigationOptions.filter(option => option.stage.id === stage.id && !option.disabled);
    const preferred = options.find(option => stage.id === this.selected?.currentStage && option.round === this.selected?.currentRound) || options[0];
    if (preferred) { this.applyNavigation(preferred); }
  }

  selectGroup(group: string): void {
    this.selectedGroup = group;
    this.refreshRound();
  }

  hasStageMatches(stage: CompetitionStage): boolean {
    return Boolean(this.data?.matches.some(match => match.leagueId === this.selected?.id && match.stage === stage.id));
  }

  team(id: string): Team | undefined { return this.data ? this.sports.getTeam(this.data, id) : undefined; }
  leagueStatusLabel(status?: string): string { return this.sports.getLeagueStatusLabel(status); }
  hasMatchDetail(match: Match): boolean { return this.sports.hasMatchDetail(this.data, match.id); }
  openMatch(match: Match): void { void this.matchNavigation.open(this.data, match); }

  private hasCompleteContent(leagueId: string): boolean {
    const overview = this.overviews.get(leagueId);
    return Boolean(overview?.matches.length && overview.teams.length);
  }

  private applyLeagueData(data: AppData): void {
    this.data = data;
    const firstAvailable = this.allNavigationOptions.find(option => !option.disabled);
    if (this.selectedStage && !this.hasStageMatches(this.selectedStage) && firstAvailable) {
      this.selectedStage = firstAvailable.stage;
      this.round = firstAvailable.round;
    }
    this.refreshStage();
    this.loading = false;
  }

  private applyNavigation(option: NavigationOption): void {
    this.selectedStage = option.stage;
    this.round = option.round;
    this.selectedGroup = '';
    this.refreshStage();
  }

  private navigationLabel(stage: CompetitionStage, round: number): string {
    if (this.isLeagueCompetition) { return `Fecha ${round}`; }
    if (stage.type === 'groups' || stage.type === 'league') { return `${stage.name} · Fecha ${round}`; }
    return stage.rounds > 1 ? `${stage.name} · Partido ${round}` : stage.name;
  }

  private groupForTeam(teamId: string): string | null {
    return this.tables.find(table => table.rows.some(row => row.teamId === teamId))?.group || null;
  }

  private refreshStage(): void {
    this.stageMatches = this.data?.matches.filter(item => item.leagueId === this.selected?.id && item.stage === this.selectedStage?.id) || [];
    this.tables = this.data?.standings.filter(item => item.leagueId === this.selected?.id && item.stage === this.selectedStage?.id) || [];
    this.groups = Array.from(new Set([...this.stageMatches.map(item => item.group), ...this.tables.map(item => item.group)]
      .filter((group): group is string => Boolean(group))));
    this.scorers = this.data?.topScorers.filter(item => item.leagueId === this.selected?.id) || [];
    this.refreshRound();
  }

  private refreshRound(): void {
    this.matches = this.stageMatches.filter(item => item.round === this.round && (!this.selectedGroup || item.group === this.selectedGroup));
  }
}
