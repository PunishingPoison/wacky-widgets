import React, { useState } from 'react';
import { Widget } from '../../types/reddit';

interface EmotionNumberGeneratorWidgetProps {
  widget: Widget;
}

const EMOTIONS = [
  { name: 'Happy', emoji: '😊', range: [1, 100] },
  { name: 'Sad', emoji: '😢', range: [1, 50] },
  { name: 'Angry', emoji: '😡', range: [50, 200] },
  { name: 'Excited', emoji: '🤩', range: [75, 999] },
  { name: 'Anxious', emoji: '😰', range: [13, 666] },
  { name: 'Confused', emoji: '😵', range: [0, 42] },
  { name: 'Zen', emoji: '😌', range: [1, 10] },
  { name: 'Chaotic', emoji: '🤪', range: [100, 9999] }
];

export const EmotionNumberGeneratorWidget: React.FC<EmotionNumberGeneratorWidgetProps> = ({ widget }) => {
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [generatedNumber, setGeneratedNumber] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [numberMeaning, setNumberMeaning] = useState('');

  const generateNumber = () => {
    if (!selectedEmotion) return;
    
    setIsGenerating(true);
    setGeneratedNumber(null);
    setNumberMeaning('');
    
    setTimeout(() => {
      const emotion = EMOTIONS.find(e => e.name === selectedEmotion);
      if (emotion) {
        const [min, max] = emotion.range;
        const number = Math.floor(Math.random() * (max - min + 1)) + min;
        setGeneratedNumber(number);
        setNumberMeaning(generateMeaning(number, emotion));
      }
      setIsGenerating(false);
    }, 2000);
  };

  const generateMeaning = (number: number, emotion: any) => {
    const meanings = [
      `This number represents the exact amount of ${emotion.name.toLowerCase()} energy you're radiating right now.`,
      `${number} is the cosmic frequency of your ${emotion.name.toLowerCase()} vibes.`,
      `The universe has calculated that ${number} perfectly captures your emotional state.`,
      `This number appeared because your ${emotion.name.toLowerCase()} feelings have reached level ${number}.`,
      `${number} is the mathematical expression of your inner ${emotion.name.toLowerCase()} chaos.`
    ];
    return meanings[Math.floor(Math.random() * meanings.length)];
  };

  const reset = () => {
    setSelectedEmotion('');
    setGeneratedNumber(null);
    setNumberMeaning('');
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🔢</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
        <p className="text-gray-500 text-sm mt-2">
          Numbers based on your current emotional state
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-3">
            Select your current emotion:
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
                disabled={isGenerating}
              >
                {emotion.emoji} {emotion.name}
              </button>
            ))}
          </div>
        </div>
        
        <button
          onClick={generateNumber}
          disabled={!selectedEmotion || isGenerating}
          className="w-full px-6 py-3 bg-black border-2 border-white text-white font-mono font-bold
                     hover:bg-white hover:text-black transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'CALCULATING EMOTIONS...' : '🔢 GENERATE MY NUMBER'}
        </button>
      </div>
      
      {isGenerating && (
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-2">
            <div className="animate-bounce text-2xl">🔢</div>
            <div className="animate-spin text-2xl">💭</div>
            <div className="animate-pulse text-2xl">✨</div>
          </div>
          <p className="text-gray-400 text-sm">
            Converting feelings into mathematics...
          </p>
        </div>
      )}
      
      {generatedNumber !== null && !isGenerating && (
        <div className="space-y-4">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 text-center">
            <div className="text-8xl font-mono font-bold text-white mb-4">
              {generatedNumber}
            </div>
            <div className="text-2xl mb-4">
              {EMOTIONS.find(e => e.name === selectedEmotion)?.emoji}
            </div>
            <h3 className="text-white font-bold text-lg mb-2">
              Your {selectedEmotion} Number
            </h3>
          </div>
          
          <div className="bg-gray-800 p-4 rounded border border-gray-600">
            <h4 className="text-white font-bold mb-2">Meaning:</h4>
            <p className="text-gray-300 leading-relaxed">
              {numberMeaning}
            </p>
          </div>
        </div>
      )}
      
      {generatedNumber !== null && (
        <div className="text-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-black border border-white text-white font-mono text-sm
                       hover:bg-white hover:text-black transition-all duration-300"
          >
            Generate New Number
          </button>
        </div>
      )}
    </div>
  );
};