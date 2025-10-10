import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

const TopNav: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const getBreadcrumbs = () => {
    const path = location.pathname;
    const parts = path.split('/').filter(Boolean);
    
    return parts.map((part, index) => {
      const path = '/' + parts.slice(0, index + 1).join('/');
      return { name: part.charAt(0).toUpperCase() + part.slice(1), path };
    });
  };

  return (
    <nav className="sticky top-0 z-50 shadow-md" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">TC</span>
              </div>
              <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Test App
              </span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <Link to="/" className="hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>
                Home
              </Link>
              {getBreadcrumbs().map((crumb, index) => (
                <React.Fragment key={crumb.path}>
                  <span>/</span>
                  <Link to={crumb.path} className="hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>
                    {crumb.name}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <input
              type="search"
              placeholder="Search..."
              className="hidden md:block px-4 py-2 rounded-lg border"
              style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: 'var(--text-secondary)' }}
            />
            
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as any)}
              className="px-3 py-1 rounded border"
              style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: 'var(--text-secondary)' }}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="gold">Gold</option>
            </select>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:opacity-80"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <span>{user.username}</span>
                </button>
                
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:opacity-80"
                      style={{ color: 'var(--text-primary)' }}
                      onClick={() => setShowDropdown(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 hover:opacity-80"
                      style={{ color: 'var(--text-primary)' }}
                      onClick={() => setShowDropdown(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:opacity-80"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
