import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  const navItems = [
    {
      title: 'Text Conversion',
      path: '/convert',
      children: [
        { title: 'Lower Case', path: '/convert/lower' },
        { title: 'Upper Case', path: '/convert/upper' },
        { title: 'Camel Case', path: '/convert/camel' },
        { title: 'Title Case', path: '/convert/title' },
        { title: 'Inverse Case', path: '/convert/inverse' },
        { title: 'Text Reverse', path: '/convert/reverse' },
      ],
    },
    {
      title: 'Math Operations',
      path: '/math',
      children: [
        { title: 'Add', path: '/math/add' },
        { title: 'Subtract', path: '/math/subtract' },
        { title: 'Multiply', path: '/math/multiply' },
        { title: 'Divide', path: '/math/divide' },
      ],
    },
    {
      title: 'Temperature',
      path: '/temp',
      children: [
        { title: 'Celsius to Fahrenheit', path: '/temp/c-to-f' },
        { title: 'Fahrenheit to Celsius', path: '/temp/f-to-c' },
      ],
    },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? 'w-16' : 'w-64'
      } transition-all duration-300 bg-gray-50 dark:bg-gray-900 gold:bg-gold-50 border-r dark:border-gray-700 gold:border-gold-200`}
    >
      <div className="p-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="mb-4 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 w-full"
        >
          {isCollapsed ? '→' : '←'}
        </button>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <div key={item.path}>
              <div
                className={`font-semibold text-gray-700 dark:text-gray-300 gold:text-gold-900 p-2 ${
                  isCollapsed ? 'text-center' : ''
                }`}
              >
                {isCollapsed ? item.title[0] : item.title}
              </div>
              {!isCollapsed && (
                <div className="ml-4 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      className={`block p-2 rounded text-sm ${
                        isActive(child.path)
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                      }`}
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
