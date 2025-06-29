import React, { useState } from 'react';
import { Widget } from '../../types/reddit';
import { TIME_TRAVEL_ERAS } from '../../utils/widgetGenerator';

interface TimeTravelWidgetProps {
  widget: Widget;
}

export const TimeTravelWidget: React.FC<TimeTravelWidgetProps> = ({ widget }) => {
  const [name, setName] = useState('');
  const [result, setResult] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateEra = () => {
    if (!name.trim()) return;
    
    setIsCalculating(true);
    setResult('');
    
    setTimeout(() => {
      const randomEra = TIME_TRAVEL_ERAS[Math.floor(Math.random() * TIME_TRAVEL_ERAS.length)];
      setResult(randomEra);
      setIsCalculating(false);
    }, 3000);
  };

  const reset = () => {
    setName('');
    setResult('');
    setIsCalculating(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">⏰</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            Enter your name to discover your temporal destiny:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name here..."
            className="w-full p-3 bg-black border-2 border-white text-white font-mono
                       focus:outline-none focus:border-gray-400 transition-colors"
            disabled={isCalculating}
          />
        </div>
        
        <button
          onClick={calculateEra}
          disabled={!name.trim() || isCalculating}
          className="w-full px-6 py-3 bg-black border-2 border-white text-white font-mono font-bold
                     hover:bg-white hover:text-black transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
        >
          {isCalculating ? 'CALCULATING TEMPORAL COORDINATES...' : 'DISCOVER MY ERA'}
        </button>
      </div>
      
      {isCalculating && (
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-2">
            <div className="animate-bounce text-2xl">⏳</div>
            <div className="animate-bounce text-2xl" style={{ animationDelay: '0.1s' }}>🌀</div>
            <div className="animate-bounce text-2xl" style={{ animationDelay: '0.2s' }}>✨</div>
          </div>
          <p className="text-gray-400 text-sm">
            Scanning the timeline for your soul's origin...
          </p>
        </div>
      )}
      
      {result && !isCalculating && (
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 text-center">
          <div className="text-4xl mb-4">🎭</div>
          <p className="text-white text-xl font-bold mb-2">
            {name}, you were...
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            {result}
          </p>
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-gray-500 text-sm">
              This is 100% scientifically accurate and not at all random.
            </p>
          </div>
        </div>
      )}
      
      {result && (
        <div className="text-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-black border border-white text-white font-mono text-sm
                       hover:bg-white hover:text-black transition-all duration-300"
          >
            Travel to Another Era
          </button>
        </div>
      )}
    </div>
  );
};