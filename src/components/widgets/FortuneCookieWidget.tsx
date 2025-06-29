import React, { useState } from 'react';
import { Widget } from '../../types/reddit';
import { FORTUNE_MESSAGES } from '../../utils/widgetGenerator';

interface FortuneCookieWidgetProps {
  widget: Widget;
}

export const FortuneCookieWidget: React.FC<FortuneCookieWidgetProps> = ({ widget }) => {
  const [fortune, setFortune] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [crackAnimation, setCrackAnimation] = useState(false);

  const openCookie = () => {
    setCrackAnimation(true);
    setTimeout(() => {
      const randomFortune = FORTUNE_MESSAGES[Math.floor(Math.random() * FORTUNE_MESSAGES.length)];
      setFortune(randomFortune);
      setIsOpen(true);
      setCrackAnimation(false);
    }, 500);
  };

  const resetCookie = () => {
    setIsOpen(false);
    setFortune('');
  };

  return (
    <div className="text-center space-y-6">
      <p className="text-gray-300 text-lg">{widget.content}</p>
      
      <div className="relative">
        <div 
          className={`text-8xl cursor-pointer transition-transform duration-500 ${
            crackAnimation ? 'animate-bounce' : 'hover:scale-110'
          } ${isOpen ? 'opacity-50' : 'opacity-100'}`}
          onClick={!isOpen ? openCookie : undefined}
        >
          🥠
        </div>
        
        {isOpen && (
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 
                         bg-black border border-white px-4 py-2 rounded-lg max-w-xs
                         animate-fade-in">
            <p className="text-white text-sm font-mono">"{fortune}"</p>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                           w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
          </div>
        )}
      </div>
      
      {isOpen && (
        <button
          onClick={resetCookie}
          className="px-4 py-2 bg-black border border-white text-white font-mono text-sm
                     hover:bg-white hover:text-black transition-all duration-300"
        >
          Get Another Cookie
        </button>
      )}
      
      {!isOpen && (
        <p className="text-gray-500 text-sm">
          Click the cookie to reveal your meaningless destiny
        </p>
      )}
    </div>
  );
};