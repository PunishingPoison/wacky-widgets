import React, { useState } from 'react';
import { Widget } from '../../types/reddit';

interface EmotionalCheeseGraterWidgetProps {
  widget: Widget;
}

const EMOTIONS = [
  { name: 'Anger', emoji: '😡', cheese: 'Sharp Cheddar' },
  { name: 'Sadness', emoji: '😢', cheese: 'Blue Cheese' },
  { name: 'Joy', emoji: '😊', cheese: 'Swiss (with holes of happiness)' },
  { name: 'Anxiety', emoji: '😰', cheese: 'Shredded Mozzarella' },
  { name: 'Confusion', emoji: '😵', cheese: 'Mystery Cheese' },
  { name: 'Love', emoji: '🥰', cheese: 'Brie (soft and creamy)' },
  { name: 'Frustration', emoji: '😤', cheese: 'Extra Sharp Parmesan' },
  { name: 'Excitement', emoji: '🤩', cheese: 'Pepper Jack' }
];

export const EmotionalCheeseGraterWidget: React.FC<EmotionalCheeseGraterWidgetProps> = ({ widget }) => {
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [isGrating, setIsGrating] = useState(false);
  const [gratedResult, setGratedResult] = useState('');

  const grateEmotion = () => {
    if (!selectedEmotion) return;
    
    setIsGrating(true);
    setGratedResult('');
    
    setTimeout(() => {
      const emotion = EMOTIONS.find(e => e.name === selectedEmotion);
      const results = [
        `Your ${selectedEmotion.toLowerCase()} has been grated into manageable ${emotion?.cheese} shavings!`,
        `Emotional processing complete: ${emotion?.cheese} particles ready for consumption.`,
        `Warning: Your ${selectedEmotion.toLowerCase()} was so intense it broke the grater. Please try softer emotions.`,
        `Success! Your ${selectedEmotion.toLowerCase()} is now bite-sized and easier to digest.`,
        `Grating complete. Side effects may include: clarity, hunger, and an inexplicable craving for crackers.`
      ];
      setGratedResult(results[Math.floor(Math.random() * results.length)]);
      setIsGrating(false);
    }, 2500);
  };

  const reset = () => {
    setSelectedEmotion('');
    setGratedResult('');
    setIsGrating(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🧀</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-3">
            Select your current emotional state:
          </label>
          <div className="grid grid-cols-2 gap-3">
            {EMOTIONS.map((emotion) => (
              <button
                key={emotion.name}
                onClick={() => setSelectedEmotion(emotion.name)}
                className={`p-3 border-2 font-mono text-sm transition-all duration-300 ${
                  selectedEmotion === emotion.name
                    ? 'border-white bg-white text-black'
                    : 'border-gray-600 text-gray-300 hover:border-white hover:text-white'
                }`}
                disabled={isGrating}
              >
                {emotion.emoji} {emotion.name}
              </button>
            ))}
          </div>
        </div>
        
        <button
          onClick={grateEmotion}
          disabled={!selectedEmotion || isGrating}
          className="w-full px-6 py-3 bg-black border-2 border-white text-white font-mono font-bold
                     hover:bg-white hover:text-black transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
        >
          {isGrating ? 'GRATING YOUR FEELINGS...' : '🧀 GRATE MY EMOTIONS'}
        </button>
      </div>
      
      {isGrating && (
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-2">
            <div className="animate-bounce text-2xl">🧀</div>
            <div className="animate-spin text-2xl">⚙️</div>
            <div className="animate-bounce text-2xl">✨</div>
          </div>
          <p className="text-gray-400 text-sm">
            Processing your emotional complexity into digestible pieces...
          </p>
        </div>
      )}
      
      {gratedResult && !isGrating && (
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <div className="text-center">
            <div className="text-4xl mb-4">🧀✨</div>
            <h3 className="text-white font-bold mb-3">Grating Complete!</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {gratedResult}
            </p>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-gray-500 text-sm">
                Emotional cheese pairs well with existential crackers and a glass of confusion.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {gratedResult && (
        <div className="text-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-black border border-white text-white font-mono text-sm
                       hover:bg-white hover:text-black transition-all duration-300"
          >
            Grate More Emotions
          </button>
        </div>
      )}
    </div>
  );
};