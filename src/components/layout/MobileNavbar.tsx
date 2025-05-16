
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ChefHat, CalendarDays, ShoppingCart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export const MobileNavbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    {
      icon: Home,
      label: 'Home',
      href: '/',
    },
    {
      icon: ChefHat,
      label: 'Recipes',
      href: '/recipes',
    },
    {
      icon: CalendarDays,
      label: 'Meal Plan',
      href: '/meal-plan',
    },
    {
      icon: ShoppingCart,
      label: 'Pantry',
      href: '/pantry',
    },
    {
      icon: User,
      label: 'Profile',
      href: '/profile',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800 z-50">
      <nav className="flex justify-around py-3">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className={cn(
              'flex flex-col items-center px-3 py-2 rounded-md',
              location.pathname === item.href
                ? 'text-wasfah-bright-teal'
                : 'text-gray-500 dark:text-gray-400'
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
