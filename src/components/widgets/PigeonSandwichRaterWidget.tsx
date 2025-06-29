import React, { useState } from 'react';
import { Widget } from '../../types/reddit';

interface PigeonSandwichRaterWidgetProps {
  widget: Widget;
}

const PIGEON_RATINGS = [
  {
    rating: 10,
    comment: "MAGNIFICENT! This sandwich is worthy of the finest park bench! I would fight other pigeons for this!",
    emoji: "🏆"
  },
  {
    rating: 9,
    comment: "Excellent! Almost as good as that pretzel I found last Tuesday. Would definitely steal from a tourist.",
    emoji: "⭐"
  },
  {
    rating: 8,
    comment: "Very good! This sandwich has potential. I'd share it with my pigeon friends... maybe.",
    emoji: "👌"
  },
  {
    rating: 7,
    comment: "Good! Solid sandwich. Better than most breadcrumbs I've encountered in the city.",
    emoji: "👍"
  },
  {
    rating: 6,
    comment: "Decent. I've had worse from garbage cans. Could use more crumbs though.",
    emoji: "😐"
  },
  {
    rating: 5,
    comment: "Meh. It's food, I guess. I'd eat it if I was really hungry and there were no other options.",
    emoji: "🤷"
  },
  {
    rating: 4,
    comment: "Below average. I've seen better sandwiches thrown away. Needs more bird-friendly ingredients.",
    emoji: "😕"
  },
  {
    rating: 3,
    comment: "Poor. This sandwich lacks the je ne sais quoi that makes food worth pecking at.",
    emoji: "👎"
  },
  {
    rating: 2,
    comment: "Bad. I wouldn't even use this to line my nest. My pigeon standards are higher than this.",
    emoji: "🙄"
  },
  {
    rating: 1,
    comment: "TERRIBLE! This is an insult to sandwiches everywhere! I'm flying away in disgust!",
    emoji: "🤮"
  }
];

export const PigeonSandwichRaterWidget: React.FC<PigeonSandwichRaterWidgetProps> = ({ widget }) => {
  const [sandwichDescription, setSandwichDescription] = useState('');
  const [rating, setRating] = useState<any>(null);
  const [isRating, setIsRating] = useState(false);
  const [pigeonMood, setPigeonMood] = useState('neutral');

  const rateSandwich = () => {
    if (!sandwichDescription.trim()) return;
    
    setIsRating(true);
    setRating(null);
    setPigeonMood('thinking');
    
    setTimeout(() => {
      // Pigeon rating algorithm (completely random but with pigeon logic)
      let score = Math.floor(Math.random() * 10) + 1;
      
      // Pigeon preferences
      if (sandwichDescription.toLowerCase().includes('bread')) score += 2;
      if (sandwichDescription.toLowerCase().includes('crumb')) score += 3;
      if (sandwichDescription.toLowerCase().includes('seed')) score += 4;
      if (sandwichDescription.toLowerCase().includes('fancy') || sandwichDescription.toLowerCase().includes('gourmet')) score -= 2;
      if (sandwichDescription.toLowerCase().includes('healthy')) score -= 1;
      
      // Keep score in bounds
      score = Math.max(1, Math.min(10, score));
      
      const selectedRating = PIGEON_RATINGS.find(r => r.rating === score) || PIGEON_RATINGS[4];
      setRating(selectedRating);
      setPigeonMood(score >= 7 ? 'happy' : score >= 4 ? 'neutral' : 'disappointed');
      setIsRating(false);
    }, 3000);
  };

  const reset = () => {
    setSandwichDescription('');
    setRating(null);
    setPigeonMood('neutral');
    setIsRating(false);
  };

  const getPigeonEmoji = () => {
    if (isRating) return '🤔';
    switch (pigeonMood) {
      case 'happy': return '😊';
      case 'disappointed': return '😤';
      default: return '🐦';
    }
  };

  const getRatingColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    if (score >= 4) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🐦</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
        <p className="text-gray-500 text-sm mt-2">
          Professional sandwich criticism from a bird brain
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            Describe your sandwich for the pigeon critic:
          </label>
          <textarea
            value={sandwichDescription}
            onChange={(e) => setSandwichDescription(e.target.value)}
            placeholder="e.g., Turkey and cheese on sourdough bread with lettuce..."
            className="w-full p-3 bg-black border-2 border-white text-white font-mono h-24 resize-none
                       focus:outline-none focus:border-gray-400 transition-colors"
            disabled={isRating}
          />
        </div>
        
        <button
          onClick={rateSandwich}
          disabled={!sandwichDescription.trim() || isRating}
          className="w-full px-6 py-3 bg-black border-2 border-white text-white font-mono font-bold
                     hover:bg-white hover:text-black transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRating ? 'PIGEON IS JUDGING...' : '🐦 GET PIGEON RATING'}
        </button>
      </div>
      
      {isRating && (
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-2">
            <div className="animate-bounce text-2xl">🐦</div>
            <div className="animate-pulse text-2xl">🥪</div>
            <div className="animate-bounce text-2xl">🤔</div>
          </div>
          <p className="text-gray-400 text-sm">
            The pigeon is carefully analyzing your sandwich...
          </p>
          <div className="text-gray-600 text-xs">
            Considering crumb potential and park bench compatibility...
          </div>
        </div>
      )}
      
      {rating && !isRating && (
        <div className="space-y-4">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">{getPigeonEmoji()}</div>
              <h3 className="text-white font-bold text-lg">Pigeon Critic Review</h3>
            </div>
            
            <div className="bg-black p-6 rounded border border-gray-600 mb-4">
              <h4 className="text-white font-bold mb-2">Sandwich:</h4>
              <p className="text-gray-300 mb-4">{sandwichDescription}</p>
              
              <div className="text-center mb-4">
                <div className={"text-6xl font-bold " + getRatingColor(rating.rating)}>
                  {rating.rating}/10
                </div>
                <div className="text-3xl mt-2">{rating.emoji}</div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded border border-gray-600">
                <h4 className="text-gray-400 font-bold mb-2">🐦 Pigeon's Verdict:</h4>
                <p className="text-gray-300 italic leading-relaxed">
                  "{rating.comment}"
                </p>
              </div>
            </div>
            
            <div className="bg-blue-900 p-4 rounded border border-blue-700 text-center">
              <p className="text-blue-300 text-sm">
                📊 Rating based on pigeon preferences and park bench experience
              </p>
            </div>
          </div>
        </div>
      )}
      
      {rating && (
        <div className="text-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-black border border-white text-white font-mono text-sm
                       hover:bg-white hover:text-black transition-all duration-300"
          >
            Rate Another Sandwich
          </button>
        </div>
      )}
      
      <div className="text-center">
        <p className="text-gray-600 text-xs italic">
          This pigeon has refined taste and 15 years of park bench dining experience
        </p>
      </div>
    </div>
  );
};