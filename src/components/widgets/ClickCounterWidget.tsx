import React, { useState } from 'react';
import { Widget } from '../../types/reddit';

interface ClickCounterWidgetProps {
  widget: Widget;
}

export const ClickCounterWidget: React.FC<ClickCounterWidgetProps> = ({ widget }) => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setCount(prev => prev + 1);
    setIsAnimating(true);
    
    if (count === 99) {
      console.log("🎉 You found the hidden widget seed! You're officially obsessed with clicking!");
    }
    
    setTimeout(() => setIsAnimating(false), 200);
  };

  return (
    <div className="text-center space-y-6">
      <div className="space-y-4">
        <div 
          className={`text-8xl font-mono transition-transform duration-200 ${
            isAnimating ? 'scale-110' : 'scale-100'
          }`}
        >
          {count}
        </div>
        <p className="text-gray-300">{widget.content}</p>
      </div>
      
      <button
        onClick={handleClick}
        className="px-8 py-4 bg-black border-2 border-white text-white font-mono font-bold text-xl
                   hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105
                   active:scale-95"
      >
        CLICK ME
      </button>
      
      {count > 0 && (
        <p className="text-gray-500 text-sm">
          Congratulations! You've wasted {count} click{count !== 1 ? 's' : ''} of your life.
        </p>
      )}
    </div>
  );
};