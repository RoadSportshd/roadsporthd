import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialChannels } from '../data/mockData';
import { Channel } from '../types';
import ChannelCard from '../components/ChannelCard';
import { Tv, TrendingUp, Clock } from 'lucide-react';

const Home: React.FC = () => {
  const [channels] = useLocalStorage<Channel[]>('roadsports-channels', initialChannels);

  const liveChannels = channels.filter(channel => channel.status === 'live');
  const upcomingChannels = channels.filter(channel => channel.status === 'scheduled');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-300 via-white to-purple-300 bg-clip-text text-transparent">
              Futbol Tutkunları
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              En kaliteli canlı futbol yayınlarını izleyin. Tüm büyük ligler ve önemli maçlar burada!
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <Tv className="w-6 h-6 text-blue-400" />
                <span className="text-white">HD Kalite</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-400" />
                <span className="text-white">Canlı Yayın</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <Clock className="w-6 h-6 text-yellow-400" />
                <span className="text-white">7/24 Erişim</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        {/* Live Matches */}
        {liveChannels.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              <h2 className="text-3xl font-bold text-white">Canlı Maçlar</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-red-500 to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {liveChannels.map((channel) => (
                <ChannelCard key={channel.id} channel={channel} />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Matches */}
        {upcomingChannels.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center space-x-3 mb-8">
              <Clock className="w-6 h-6 text-blue-400" />
              <h2 className="text-3xl font-bold text-white">Yaklaşan Maçlar</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-400 to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingChannels.map((channel) => (
                <ChannelCard key={channel.id} channel={channel} />
              ))}
            </div>
          </section>
        )}

        {/* All Channels */}
        <section>
          <div className="flex items-center space-x-3 mb-8">
            <Tv className="w-6 h-6 text-purple-400" />
            <h2 className="text-3xl font-bold text-white">Tüm Kanallar</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-400 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {channels.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;