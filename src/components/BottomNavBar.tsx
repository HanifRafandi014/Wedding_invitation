import React from 'react';
import { Home, Users, Calendar, BookHeart, Image, Gift, MessageSquare } from 'lucide-react';

interface BottomNavBarProps {
  onNavClick: (id: string) => void;
  activeSection: string;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ onNavClick, activeSection }) => {
  const navItems = [
    { id: 'top', label: 'Home', icon: Home },
    { id: 'mempelai', label: 'Mempelai', icon: Users },
    { id: 'acara', label: 'Acara', icon: Calendar },
    { id: 'kisah', label: 'Kisah', icon: BookHeart },
    { id: 'galeri', label: 'Galeri', icon: Image },
    { id: 'amplop', label: 'Amplop', icon: Gift },
    { id: 'ucapan', label: 'Ucapan', icon: MessageSquare },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pb-2 px-2 pointer-events-none">
      <nav className="pointer-events-auto bg-[#1A1816]/95 backdrop-blur-md border border-[#C5A059]/40 rounded-full px-3 py-1.5 shadow-2xl flex items-center gap-1 sm:gap-2 max-w-md w-full justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavClick(item.id)}
              className={`flex flex-col items-center justify-center p-1.5 sm:px-2.5 rounded-full transition-all duration-200 ${
                isActive
                  ? 'text-[#F4E8C1] scale-110'
                  : 'text-[#9E9689] hover:text-[#E8D5A3]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : ''}`} />
              <span className={`text-[9px] mt-0.5 font-medium ${isActive ? 'text-[#F4E8C1]' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
