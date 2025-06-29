import React, { useState } from 'react';
import { Widget } from '../../types/reddit';
import { SANDWICH_RESPONSES } from '../../utils/widgetGenerator';

interface SandwichTherapistWidgetProps {
  widget: Widget;
}

export const SandwichTherapistWidget: React.FC<SandwichTherapistWidgetProps> = ({ widget }) => {
  const [sandwichType, setSandwichType] = useState('');
  const [response, setResponse] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const analyzesandwich = () => {
    if (!sandwichType.trim()) return;
    
    setIsThinking(true);
    setResponse('');
    
    setTimeout(() => {
      const randomResponse = SANDWICH_RESPONSES[Math.floor(Math.random() * SANDWICH_RESPONSES.length)];
      setResponse(randomResponse);
      setIsThinking(false);
    }, 2000);
  };

  const reset = () => {
    setSandwichType('');
    setResponse('');
    setIsThinking(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🥪</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            What kind of sandwich are you today?
          </label>
          <input
            type="text"
            value={sandwichType}
            onChange={(e) => setSandwichType(e.target.value)}
            placeholder="e.g., grilled cheese, BLT, turkey club..."
            className="w-full p-3 bg-black border-2 border-white text-white font-mono
                       focus:outline-none focus:border-gray-400 transition-colors"
            disabled={isThinking}
          />
        </div>
        
        <button
          onClick={analyzesandwich}
          disabled={!sandwichType.trim() || isThinking}
          className="w-full px-6 py-3 bg-black border-2 border-white text-white font-mono font-bold
                     hover:bg-white hover:text-black transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
        >
          {isThinking ? 'ANALYZING YOUR BREAD SOUL...' : 'ANALYZE MY SANDWICH IDENTITY'}
        </button>
      </div>
      
      {isThinking && (
        <div className="text-center">
          <div className="animate-spin text-4xl mb-2">🧠</div>
          <p className="text-gray-400 text-sm">
            Consulting the ancient sandwich wisdom...
          </p>
        </div>
      )}
      
      {response && !isThinking && (
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">🎭</div>
            <div>
              <p className="text-white text-lg leading-relaxed">
                "{response}"
              </p>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-gray-400 text-sm">
                  - Dr. Sandwich, PhD in Bread Psychology
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {response && (
        <div className="text-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-black border border-white text-white font-mono text-sm
                       hover:bg-white hover:text-black transition-all duration-300"
          >
            New Sandwich Session
          </button>
        </div>
      )}
    </div>
  );
};