import { Channel } from '../types';

export const initialChannels: Channel[] = [
  {
    id: '1',
    name: 'HD Spor 1',
    image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg',
    streamUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    homeTeam: 'Galatasaray',
    awayTeam: 'Fenerbahçe',
    homeTeamLogo: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
    awayTeamLogo: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
    matchTime: '20:00',
    league: 'Süper Lig',
    status: 'live'
  },
  {
    id: '2',
    name: 'HD Spor 2',
    image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg',
    streamUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    homeTeam: 'Beşiktaş',
    awayTeam: 'Trabzonspor',
    homeTeamLogo: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
    awayTeamLogo: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
    matchTime: '22:30',
    league: 'Süper Lig',
    status: 'scheduled'
  }
];