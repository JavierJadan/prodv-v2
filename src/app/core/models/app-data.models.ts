export type MatchStatus = 'scheduled' | 'live' | 'finished' | 'postponed';

export interface League {
  id: string;
  name: string;
  shortName: string;
  country: string;
  city?: string;
  logoUrl: string;
  season: number;
  status: string;
  format: string;
  teamSize: number;
  currentStage: string;
  currentRound: number;
  stages: CompetitionStage[];
}

export interface CompetitionStage { id: string; name: string; type: string; rounds: number; }
export interface LineupPlayer { id: string; name: string; number: number; role: string; x: number; y: number; photoUrl?: string; }

export interface Team {
  id: string;
  name: string;
  shortName: string;
  crestUrl: string;
  city: string;
}

export interface MatchSide {
  teamId: string;
  score: number | null;
  penalties: number | null;
}

export interface Match {
  id: string;
  leagueId: string;
  stage: string;
  round: number;
  group: string | null;
  startsAt: string;
  status: MatchStatus;
  venue: { name: string; city: string };
  home: MatchSide;
  away: MatchSide;
  minute: number | null;
  winnerTeamId: string | null;
}

export interface StandingRow {
  position: number;
  teamId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string[];
}

export interface Standing {
  leagueId: string;
  stage: string;
  group: string | null;
  rows: StandingRow[];
}

export interface TopScorer {
  leagueId: string;
  position: number;
  playerId: string;
  playerName: string;
  teamId: string;
  goals: number;
  assists: number;
  appearances: number;
}

export interface AppData {
  meta: { generatedAt: string; timezone: string; season: number; source: string };
  leagues: League[];
  teams: Team[];
  matches: Match[];
  standings: Standing[];
  topScorers: TopScorer[];
  matchDetails: Record<string, any>;
}
