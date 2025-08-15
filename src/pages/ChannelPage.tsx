import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialChannels } from '../data/mockData';
import { Channel } from '../types';
import VideoPlayer from '../components/VideoPlayer';
import { ArrowLeft, Clock, Trophy, Users, Tv, Calendar, MapPin } from 'lucide-react';

const ChannelPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [channels] = useLocalStorage<Channel[]>('roadsports-channels', initialChannels);
  
  const channel = channels.find(c => c.id === id);

  if (!channel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Kanal bulunamadı</h1>
          <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors">
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    );
  }

  const getStatusInfo = () => {
    switch (channel.status) {
      case 'live':
        return {
          badge: (
            <div className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-full font-bold">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <span>CANLI YAYIN</span>
            </div>
          ),
          text: 'Maç şu anda canlı yayında'
        };
      case 'scheduled':
        return {
          badge: (
            <div className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-full font-bold">
              <Clock className="w-5 h-5" />
              <span>YAKINDA</span>
            </div>
          ),
          text: `Maç ${channel.matchTime}'da başlayacak`
        };
      default:
        return {
          badge: (
            <div className="bg-gray-500 text-white px-4 py-2 rounded-full font-bold">
              SONA ERDİ
            </div>
          ),
          text: 'Maç sona erdi'
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          to="/"
          className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Ana Sayfaya Dön</span>
        </Link>

        {/* Channel Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 mb-8 border border-gray-700 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-xl">
                  <Tv className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{channel.name}</h1>
                  <div className="flex items-center space-x-4 text-gray-300">
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-5 h-5 text-yellow-400" />
                      <span>{channel.league}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-blue-400" />
                      <span>{channel.matchTime}</span>
                    </div>
                  </div>
                </div>
              </div>
              {statusInfo.badge}
              <p className="text-gray-300 mt-2">{statusInfo.text}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-3">
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-700 p-4">
              <VideoPlayer src={channel.streamUrl} poster={channel.image} />
            </div>
          </div>

          {/* Match Info Sidebar */}
          <div className="space-y-6">
            {/* Teams */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <Users className="w-6 h-6 text-blue-400" />
                <span>Takımlar</span>
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-900/50 to-transparent rounded-xl p-4 border-l-4 border-blue-400">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={channel.homeTeamLogo} 
                      alt={channel.homeTeam}
                      className="w-12 h-12 rounded-full border-2 border-blue-400"
                    />
                    <div>
                      <p className="text-white font-bold">{channel.homeTeam}</p>
                      <p className="text-gray-400 text-sm">Ev Sahibi</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-bold inline-block">
                    VS
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-900/50 to-transparent rounded-xl p-4 border-l-4 border-purple-400">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={channel.awayTeamLogo} 
                      alt={channel.awayTeam}
                      className="w-12 h-12 rounded-full border-2 border-purple-400"
                    />
                    <div>
                      <p className="text-white font-bold">{channel.awayTeam}</p>
                      <p className="text-gray-400 text-sm">Deplasman</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Match Details */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <Calendar className="w-6 h-6 text-green-400" />
                <span>Maç Detayları</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-700">
                  <span className="text-gray-400">Liga</span>
                  <span className="text-white font-medium">{channel.league}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-700">
                  <span className="text-gray-400">Saat</span>
                  <span className="text-white font-medium">{channel.matchTime}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-700">
                  <span className="text-gray-400">Durum</span>
                  <span className={`font-medium ${
                    channel.status === 'live' ? 'text-red-400' :
                    channel.status === 'scheduled' ? 'text-blue-400' : 'text-gray-400'
                  }`}>
                    {channel.status === 'live' ? 'Canlı' :
                     channel.status === 'scheduled' ? 'Yakında' : 'Bitti'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-400">Kanal</span>
                  <span className="text-white font-medium">{channel.name}</span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-6 border border-blue-800/30">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span>Yayın Bilgisi</span>
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Bu yayın HD kalitede sunulmaktadır. En iyi izleme deneyimi için 
                hızlı bir internet bağlantısı önerilir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelPage;