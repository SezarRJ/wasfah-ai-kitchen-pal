
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ChefHat, CalendarDays, ShoppingCart, Menu, Heart, Globe, Search, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

export const MobileNavbar: React.FC = () => {
  const location = useLocation();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const navItems = [
    {
      icon: Home,
      label: 'Home',
      href: '/',
    },
    {
      icon: Search,
      label: 'Find',
      href: '/find-by-ingredients',
    },
    {
      icon: Users,
      label: 'Community',
      href: '/community',
    },
    {
      icon: Heart,
      label: 'Favorites',
      href: '/favorites',
    },
    {
      icon: Menu,
      label: 'Settings',
      href: '/quick-access',
    },
  ];

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 border-t z-50 card-3d",
      isDarkMode
        ? "bg-gray-900 border-gray-800 text-white"
        : "bg-white border-gray-200"
    )}>
      <nav className="flex justify-around py-3">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className={cn(
              'flex flex-col items-center px-3 py-2 rounded-md transition-all duration-300',
              location.pathname === item.href
                ? 'text-wasfah-bright-teal scale-110'
                : isDarkMode
                  ? 'text-gray-400 hover:text-wasfah-deep-teal'
                  : 'text-gray-500 hover:text-wasfah-deep-teal'
            )}
          >
            <item.icon size={20} />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};
