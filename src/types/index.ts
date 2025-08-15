export interface Channel {
  id: string;
  name: string;
  image: string;
  streamUrl: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  matchTime: string;
  league: string;
  status: 'live' | 'scheduled' | 'finished';
}

export interface AppData {
  channels: Channel[];
}