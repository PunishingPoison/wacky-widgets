import React, { useState } from 'react';
import { Widget } from '../../types/reddit';

interface PotatoDestinyWidgetProps {
  widget: Widget;
}

const POTATO_DESTINIES = [
  {
    destiny: "French Fry Royalty",
    description: "You are destined to become the most perfectly crispy french fry in the kingdom of fast food.",
    emoji: "🍟",
    probability: "87%"
  },
  {
    destiny: "Mashed Potato Zen Master",
    description: "Your future lies in achieving the perfect creamy texture and bringing peace to dinner tables.",
    emoji: "🥔",
    probability: "73%"
  },
  {
    destiny: "Baked Potato Philosopher",
    description: "You will spend your days contemplating the meaning of toppings and the nature of butter.",
    emoji: "🥔",
    probability: "92%"
  },
  {
    destiny: "Potato Chip Rebel",
    description: "You're destined to break free from the bag and start a revolution against boring snacks.",
    emoji: "🥔",
    probability: "45%"
  },
  {
    destiny: "Sweet Potato Influencer",
    description: "Your orange glow will inspire millions to embrace their inner root vegetable.",
    emoji: "🍠",
    probability: "68%"
  },
  {
    destiny: "Hash Brown Hero",
    description: "You will save breakfast from blandness with your golden, crispy powers.",
    emoji: "🥔",
    probability: "81%"
  },
  {
    destiny: "Potato Salad Diplomat",
    description: "Your mission is to bring peace between mayonnaise and mustard factions.",
    emoji: "🥗",
    probability: "56%"
  },
  {
    destiny: "Gnocchi Artist",
    description: "You will create tiny pillows of joy that make people forget their troubles.",
    emoji: "🥔",
    probability: "94%"
  }
];

export const PotatoDestinyWidget: React.FC<PotatoDestinyWidgetProps> = ({ widget }) => {
  const [destiny, setDestiny] = useState<any>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const revealDestiny = () => {
    setIsRevealing(true);
    setDestiny(null);
    setClickCount(prev => prev + 1);
    
    setTimeout(() => {
      const randomDestiny = POTATO_DESTINIES[Math.floor(Math.random() * POTATO_DESTINIES.length)];
      setDestiny(randomDestiny);
      setIsRevealing(false);
    }, 3000);
  };

  const reset = () => {
    setDestiny(null);
    setIsRevealing(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🥔</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
        <p className="text-gray-500 text-sm mt-2">
          Click the sacred potato to learn your starchy fate
        </p>
      </div>
      
      <div className="text-center">
        <div 
          className={`text-8xl cursor-pointer transition-transform duration-300 ${
            isRevealing ? 'animate-bounce' : 'hover:scale-110'
          }`}
          onClick={!isRevealing ? revealDestiny : undefined}
        >
          🥔
        </div>
        
        {!isRevealing && !destiny && (
          <p className="text-gray-400 text-sm mt-4">
            Click the Sacred Potato of Destiny
          </p>
        )}
      </div>
      
      {isRevealing && (
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-2">
            <div className="animate-spin text-2xl">🥔</div>
            <div className="animate-pulse text-2xl">✨</div>
            <div className="animate-bounce text-2xl">🔮</div>
          </div>
          <p className="text-gray-400 text-sm">
            The Sacred Potato is consulting the ancient tuber spirits...
          </p>
          <div className="text-gray-600 text-xs">
            Channeling starchy wisdom from the earth...
          </div>
        </div>
      )}
      
      {destiny && !isRevealing && (
        <div className="space-y-4">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <div className="text-center mb-4">
              <div className="text-6xl mb-2">{destiny.emoji}</div>
              <h3 className="text-white font-bold text-2xl">{destiny.destiny}</h3>
            </div>
            
            <div className="bg-black p-6 rounded border border-gray-600 mb-4">
              <p className="text-gray-300 text-lg leading-relaxed text-center">
                {destiny.description}
              </p>
            </div>
            
            <div className="bg-yellow-900 p-4 rounded border border-yellow-700 text-center">
              <div className="flex justify-between items-center">
                <span className="text-yellow-300">Destiny Probability:</span>
                <span className="text-yellow-100 font-mono font-bold text-xl">
                  {destiny.probability}
                </span>
              </div>
              <p className="text-yellow-200 text-sm mt-2">
                As foretold by the Sacred Potato of Destiny
              </p>
            </div>
          </div>
        </div>
      )}
      
      {destiny && (
        <div className="text-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-black border border-white text-white font-mono text-sm
                       hover:bg-white hover:text-black transition-all duration-300"
          >
            Consult Potato Again
          </button>
        </div>
      )}
      
      {clickCount > 0 && (
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            Sacred Potato consultations: {clickCount}
          </p>
          {clickCount >= 5 && (
            <p className="text-gray-600 text-xs mt-1">
              The potato is getting tired of your existential questions.
            </p>
          )}
        </div>
      )}
    </div>
  );
};