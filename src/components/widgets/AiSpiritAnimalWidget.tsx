import React, { useState } from 'react';
import { Widget } from '../../types/reddit';
import { SPIRIT_ANIMALS } from '../../utils/widgetGenerator';

interface AiSpiritAnimalWidgetProps {
  widget: Widget;
}

export const AiSpiritAnimalWidget: React.FC<AiSpiritAnimalWidgetProps> = ({ widget }) => {
  const [mood, setMood] = useState(5);
  const [result, setResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeMood = () => {
    setIsAnalyzing(true);
    setResult(null);
    
    setTimeout(() => {
      const spiritAnimal = SPIRIT_ANIMALS[Math.floor(Math.random() * SPIRIT_ANIMALS.length)];
      setResult(spiritAnimal);
      setIsAnalyzing(false);
    }, 2500);
  };

  const reset = () => {
    setMood(5);
    setResult(null);
    setIsAnalyzing(false);
  };

  const getMoodLabel = () => {
    if (mood <= 2) return "Dead Inside 💀";
    if (mood <= 4) return "Sleepy Vibes 🥱";
    if (mood <= 6) return "Neutral Chaos 😐";
    if (mood <= 8) return "Caffeinated Energy ☕";
    return "Explosive Chaos 🚀";
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🔮</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            Rate your current energy level:
          </label>
          <div className="space-y-3">
            <input
              type="range"
              min="1"
              max="10"
              value={mood}
              onChange={(e) => setMood(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer slider"
              disabled={isAnalyzing}
            />
            <div className="text-center">
              <span className="text-white font-mono text-lg">{getMoodLabel()}</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={analyzeMood}
          disabled={isAnalyzing}
          className="w-full px-6 py-3 bg-black border-2 border-white text-white font-mono font-bold
                     hover:bg-white hover:text-black transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
        >
          {isAnalyzing ? 'ANALYZING YOUR CHAOS ENERGY...' : 'DISCOVER MY SPIRIT ANIMAL'}
        </button>
      </div>
      
      {isAnalyzing && (
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-2">
            <div className="animate-bounce text-2xl">🔮</div>
            <div className="animate-bounce text-2xl" style={{ animationDelay: '0.1s' }}>✨</div>
            <div className="animate-bounce text-2xl" style={{ animationDelay: '0.2s' }}>🌟</div>
          </div>
          <p className="text-gray-400 text-sm">
            Consulting the ancient spirits of chaos...
          </p>
        </div>
      )}
      
      {result && !isAnalyzing && (
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 text-center">
          <div className="text-6xl mb-4">{result.emoji}</div>
          <h3 className="text-white text-2xl font-bold mb-2">
            You are a {result.animal}!
          </h3>
          <p className="text-gray-300 text-lg italic mb-4">
            "{result.motto}"
          </p>
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-gray-500 text-sm">
              This is 100% scientifically accurate based on your energy reading of {mood}/10.
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
            Find New Spirit Animal
          </button>
        </div>
      )}
    </div>
  );
};