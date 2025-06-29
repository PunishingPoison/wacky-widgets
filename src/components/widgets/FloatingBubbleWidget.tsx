import React, { useState, useEffect } from 'react';
import { Widget } from '../../types/reddit';

interface FloatingBubbleWidgetProps {
  widget: Widget;
}

export const FloatingBubbleWidget: React.FC<FloatingBubbleWidgetProps> = ({ widget }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isPopped, setIsPopped] = useState(false);
  const [direction, setDirection] = useState({ x: 1, y: 1 });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => {
        let newX = prev.x + direction.x * 0.5;
        let newY = prev.y + direction.y * 0.3;
        let newDirectionX = direction.x;
        let newDirectionY = direction.y;

        if (newX >= 80 || newX <= 20) {
          newDirectionX = -direction.x;
        }
        if (newY >= 70 || newY <= 30) {
          newDirectionY = -direction.y;
        }

        setDirection({ x: newDirectionX, y: newDirectionY });
        
        return {
          x: Math.max(20, Math.min(80, newX)),
          y: Math.max(30, Math.min(70, newY))
        };
      });
    }, 100);

    return () => clearInterval(interval);
  }, [direction]);

  const handlePop = () => {
    setIsPopped(true);
    setTimeout(() => setIsPopped(false), 1000);
  };

  return (
    <div className="relative h-96 overflow-hidden">
      <div className="text-center mb-4">
        <p className="text-gray-400 text-sm">Watch the thought bubble float around. Click to pop it!</p>
      </div>
      
      <div 
        className={`absolute transition-all duration-100 cursor-pointer ${
          isPopped ? 'scale-0' : 'scale-100'
        }`}
        style={{ 
          left: `${position.x}%`, 
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
        onClick={handlePop}
      >
        <div className="relative">
          <div className="bg-white text-black p-4 rounded-full max-w-xs text-sm font-medium shadow-lg">
            {widget.content}
          </div>
          <div className="absolute -bottom-2 left-8 w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-white"></div>
        </div>
      </div>

      {isPopped && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl animate-ping">💥</div>
        </div>
      )}
    </div>
  );
};