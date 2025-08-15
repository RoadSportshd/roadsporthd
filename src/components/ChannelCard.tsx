import React from 'react';
import { Link } from 'react-router-dom';
import { Channel } from '../types';
import { Clock, Users, Trophy, Play } from 'lucide-react';

interface ChannelCardProps {
  channel: Channel;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ channel }) => {
  const getStatusBadge = () => {
    switch (channel.status) {
      case 'live':
        return (
          <span className="flex items-center space-x-1 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>CANLI</span>
          </span>
        );
      case 'scheduled':
        return (
          <span className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            <Clock className="w-4 h-4" />
            <span>YAKINDA</span>
          </span>
        );
      default:
        return (
          <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            BİTTİ
          </span>
        );
    }
  };

  return (
    <Link to={`/channel/${channel.id}`}>
      <div className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] border border-gray-700">
        <div className="relative">
          <img 
            src={channel.image} 
            alt={channel.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            {getStatusBadge()}
          </div>
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-lg">
            <span className="text-white font-medium">{channel.name}</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors duration-200">
                <Play className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-300 font-medium">{channel.league}</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-400">
              <Clock className="w-4 h-4" />
              <span className="font-medium">{channel.matchTime}</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-4 border border-blue-800/30">
            <div className="flex items-center justify-between">
              <div className="text-center">
                <img 
                  src={channel.homeTeamLogo} 
                  alt={channel.homeTeam}
                  className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-blue-400"
                />
                <p className="text-white font-bold text-sm">{channel.homeTeam}</p>
              </div>
              
              <div className="text-center px-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-bold text-lg">
                  VS
                </div>
              </div>
              
              <div className="text-center">
                <img 
                  src={channel.awayTeamLogo} 
                  alt={channel.awayTeam}
                  className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-purple-400"
                />
                <p className="text-white font-bold text-sm">{channel.awayTeam}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-center space-x-2 text-gray-400">
            <Users className="w-4 h-4" />
            <span className="text-sm">Canlı İzle</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChannelCard;