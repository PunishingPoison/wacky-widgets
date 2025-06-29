import React, { useState } from 'react';
import { Widget } from '../../types/reddit';
import { MEME_HOROSCOPES } from '../../utils/widgetGenerator';

interface RedditMemeZodiacWidgetProps {
  widget: Widget;
}

const VIBES = [
  { id: 'chaotic', label: 'Chaotic Energy 🌪️', emoji: '🌪️' },
  { id: 'dead-inside', label: 'Dead Inside 💀', emoji: '💀' },
  { id: 'hopeful', label: 'Hopeful Delusion ✨', emoji: '✨' },
  { id: 'unhinged', label: 'Unhinged Vibes 🤡', emoji: '🤡' },
  { id: 'sleepy-goblin', label: 'Sleepy Goblin 😴', emoji: '😴' },
  { id: 'main-character', label: 'Main Character Energy 👑', emoji: '👑' }
];

export const RedditMemeZodiacWidget: React.FC<RedditMemeZodiacWidgetProps> = ({ widget }) => {
  const [selectedVibe, setSelectedVibe] = useState('');
  const [horoscope, setHoroscope] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateHoroscope = () => {
    if (!selectedVibe) return;
    
    setIsGenerating(true);
    setHoroscope('');
    
    setTimeout(() => {
      const randomHoroscope = MEME_HOROSCOPES[Math.floor(Math.random() * MEME_HOROSCOPES.length)];
      setHoroscope(randomHoroscope);
      setIsGenerating(false);
    }, 2000);
  };

  const reset = () => {
    setSelectedVibe('');
    setHoroscope('');
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🔮</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-3">
            Choose your current vibe:
          </label>
          <div className="grid grid-cols-2 gap-3">
            {VIBES.map((vibe) => (
              <button
                key={vibe.id}
                onClick={() => setSelectedVibe(vibe.id)}
                className={`p-3 border-2 font-mono text-sm transition-all duration-300 ${
                  selectedVibe === vibe.id
                    ? 'border-white bg-white text-black'
                    : 'border-gray-600 text-gray-300 hover:border-white hover:text-white'
                }`}
                disabled={isGenerating}
              >
                {vibe.label}
              </button>
            ))}
          </div>
        </div>
        
        <button
          onClick={generateHoroscope}
          disabled={!selectedVibe || isGenerating}
          className="w-full px-6 py-3 bg-black border-2 border-white text-white font-mono font-bold
                     hover:bg-white hover:text-black transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
        >
          {isGenerating ? 'CONSULTING THE MEME STARS...' : 'GET MY MEME HOROSCOPE'}
        </button>
      </div>
      
      {isGenerating && (
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-2">
            <div className="animate-spin text-2xl">🌟</div>
            <div className="animate-pulse text-2xl">🔮</div>
            <div className="animate-bounce text-2xl">✨</div>
          </div>
          <p className="text-gray-400 text-sm">
            The meme gods are aligning your chaos...
          </p>
        </div>
      )}
      
      {horoscope && !isGenerating && (
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">
              {VIBES.find(v => v.id === selectedVibe)?.emoji}
            </div>
            <h3 className="text-white font-bold text-lg">Your Meme Horoscope</h3>
          </div>
          <div className="space-y-4">
            <p className="text-gray-300 text-lg leading-relaxed italic text-center">
              "{horoscope}"
            </p>
            {widget.data && (
              <div className="bg-gray-800 p-4 rounded border border-gray-600">
                <p className="text-gray-200 text-sm">
                  Today's meme energy: {widget.data.title}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  From r/{widget.data.subreddit} • {widget.data.ups} upvotes
                </p>
              </div>
            )}
            <div className="pt-4 border-t border-gray-700 text-center">
              <p className="text-gray-500 text-sm">
                - The Meme Oracle, PhD in Digital Chaos
              </p>
            </div>
          </div>
        </div>
      )}
      
      {horoscope && (
        <div className="text-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-black border border-white text-white font-mono text-sm
                       hover:bg-white hover:text-black transition-all duration-300"
          >
            New Horoscope Reading
          </button>
        </div>
      )}
    </div>
  );
};