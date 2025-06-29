import React, { useState } from 'react';
import { Widget } from '../../types/reddit';

interface CatMeowWidgetProps {
  widget: Widget;
}

export const CatMeowWidget: React.FC<CatMeowWidgetProps> = ({ widget }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [meowCount, setMeowCount] = useState(0);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setMeowCount(prev => prev + 1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="text-center space-y-6">
      <p className="text-gray-300 text-lg">{widget.content}</p>
      
      <div 
        className="relative cursor-pointer select-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          className={`text-8xl transition-transform duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        >
          {isHovered ? '😸' : '😺'}
        </div>
        
        {isHovered && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 
                         bg-black border border-white px-3 py-1 rounded-full text-sm font-mono">
            MEOW!
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <p className="text-gray-400 text-sm">
          Hover count: {meowCount}
        </p>
        {meowCount >= 10 && (
          <p className="text-gray-500 text-xs">
            This cat is getting tired of your attention...
          </p>
        )}
      </div>
    </div>
  );
};