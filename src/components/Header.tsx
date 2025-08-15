import React from 'react';
import { Link } from 'react-router-dom';
import { Tv, Shield } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 shadow-2xl">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Tv className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                RoadSports
              </h1>
              <p className="text-blue-200 text-sm">Canlı Futbol Yayınları</p>
            </div>
          </Link>
          
          <Link 
            to="/admin"
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Shield className="w-5 h-5" />
            <span>Admin Panel</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;