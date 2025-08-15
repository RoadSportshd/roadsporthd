import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialChannels } from '../data/mockData';
import { Channel } from '../types';
import { Shield, Plus, Edit, Trash2, Save, X, Eye, EyeOff } from 'lucide-react';

const Admin: React.FC = () => {
  const [channels, setChannels] = useLocalStorage<Channel[]>('roadsports-channels', initialChannels);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [editingChannel, setEditingChannel] = useState<Channel | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'taha7171') {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Hatalı şifre!');
      setPassword('');
    }
  };

  const handleAddChannel = () => {
    const newChannel: Channel = {
      id: Date.now().toString(),
      name: 'Yeni Kanal',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg',
      streamUrl: '',
      homeTeam: 'Takım A',
      awayTeam: 'Takım B',
      homeTeamLogo: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
      awayTeamLogo: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
      matchTime: '20:00',
      league: 'Lig Adı',
      status: 'scheduled'
    };
    setChannels([...channels, newChannel]);
    setEditingChannel(newChannel);
    setShowAddForm(false);
  };

  const handleUpdateChannel = (updatedChannel: Channel) => {
    setChannels(channels.map(channel => 
      channel.id === updatedChannel.id ? updatedChannel : channel
    ));
    setEditingChannel(null);
  };

  const handleDeleteChannel = (id: string) => {
    if (confirm('Bu kanalı silmek istediğinizden emin misiniz?')) {
      setChannels(channels.filter(channel => channel.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Paneli</h1>
            <p className="text-gray-400">Devam etmek için şifrenizi girin</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin şifresi"
                className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 mb-8 border border-gray-700 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Admin Paneli</h1>
                <p className="text-gray-400">Kanal yönetimi ve düzenleme</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Yeni Kanal</span>
            </button>
          </div>
        </div>

        {/* Add Channel Form */}
        {showAddForm && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 mb-8 border border-gray-700 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Yeni Kanal Ekle</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="text-center py-8">
              <button
                onClick={handleAddChannel}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Boş Kanal Oluştur
              </button>
            </div>
          </div>
        )}

        {/* Channels List */}
        <div className="grid gap-6">
          {channels.map((channel) => (
            <div key={channel.id} className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-xl overflow-hidden">
              {editingChannel?.id === channel.id ? (
                <ChannelEditForm 
                  channel={editingChannel}
                  onSave={handleUpdateChannel}
                  onCancel={() => setEditingChannel(null)}
                />
              ) : (
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={channel.image} 
                        alt={channel.name}
                        className="w-16 h-16 rounded-xl object-cover border-2 border-blue-400"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-white">{channel.name}</h3>
                        <p className="text-gray-400">{channel.homeTeam} vs {channel.awayTeam}</p>
                        <p className="text-sm text-gray-500">{channel.league} • {channel.matchTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        channel.status === 'live' ? 'bg-red-500 text-white' :
                        channel.status === 'scheduled' ? 'bg-blue-500 text-white' :
                        'bg-gray-500 text-white'
                      }`}>
                        {channel.status === 'live' ? 'CANLI' :
                         channel.status === 'scheduled' ? 'YAKINDA' : 'BİTTİ'}
                      </span>
                      
                      <button
                        onClick={() => setEditingChannel(channel)}
                        className="p-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={() => handleDeleteChannel(channel.id)}
                        className="p-3 bg-red-600 hover:bg-red-700 rounded-xl text-white transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ChannelEditFormProps {
  channel: Channel;
  onSave: (channel: Channel) => void;
  onCancel: () => void;
}

const ChannelEditForm: React.FC<ChannelEditFormProps> = ({ channel, onSave, onCancel }) => {
  const [formData, setFormData] = useState(channel);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field: keyof Channel, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Kanal Düzenle</h3>
        <div className="flex items-center space-x-3">
          <button
            type="submit"
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-medium transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>Kaydet</span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-xl font-medium transition-colors"
          >
            <X className="w-5 h-5" />
            <span>İptal</span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-300 font-medium mb-2">Kanal Adı</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">Liga</label>
          <input
            type="text"
            value={formData.league}
            onChange={(e) => handleInputChange('league', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">Ev Sahibi Takım</label>
          <input
            type="text"
            value={formData.homeTeam}
            onChange={(e) => handleInputChange('homeTeam', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">Deplasman Takımı</label>
          <input
            type="text"
            value={formData.awayTeam}
            onChange={(e) => handleInputChange('awayTeam', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">Maç Saati</label>
          <input
            type="text"
            value={formData.matchTime}
            onChange={(e) => handleInputChange('matchTime', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">Durum</label>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="scheduled">Yakında</option>
            <option value="live">Canlı</option>
            <option value="finished">Bitti</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-gray-300 font-medium mb-2">Yayın URL'si (M3U8 veya MP4)</label>
        <input
          type="url"
          value={formData.streamUrl}
          onChange={(e) => handleInputChange('streamUrl', e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://example.com/stream.m3u8"
          required
        />
      </div>

      <div>
        <label className="block text-gray-300 font-medium mb-2">Kanal Görseli URL'si</label>
        <input
          type="url"
          value={formData.image}
          onChange={(e) => handleInputChange('image', e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://example.com/image.jpg"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-300 font-medium mb-2">Ev Sahibi Takım Logosu URL'si</label>
          <input
            type="url"
            value={formData.homeTeamLogo}
            onChange={(e) => handleInputChange('homeTeamLogo', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/home-team-logo.jpg"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">Deplasman Takımı Logosu URL'si</label>
          <input
            type="url"
            value={formData.awayTeamLogo}
            onChange={(e) => handleInputChange('awayTeamLogo', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/away-team-logo.jpg"
            required
          />
        </div>
      </div>
    </form>
  );
};

export default Admin;