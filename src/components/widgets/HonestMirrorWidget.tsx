import React, { useState } from 'react';
import { Widget } from '../../types/reddit';

interface HonestMirrorWidgetProps {
  widget: Widget;
}

const HONEST_REFLECTIONS = [
  "You look like you've made some questionable life choices, but at least you're consistent.",
  "I see someone who's trying their best, which is both admirable and slightly concerning.",
  "Your reflection shows a person who definitely googles 'how to adult' more than they'd like to admit.",
  "I'm seeing someone who has strong opinions about pineapple on pizza and isn't afraid to share them.",
  "You look like the type of person who talks to their houseplants. (This is actually a good thing.)",
  "Your reflection reveals someone who has definitely eaten cereal for dinner this week.",
  "I see a person who's 73% caffeine and 27% existential dread. Perfectly balanced.",
  "You look like you have 47 browser tabs open right now and you're proud of it.",
  "Your reflection shows someone who's mastered the art of looking busy while doing absolutely nothing.",
  "I see a person who's definitely going to save this meme for later and then forget about it.",
  "You look like you have strong feelings about the correct way to load a dishwasher.",
  "Your reflection reveals someone who's probably overthinking this mirror widget right now.",
  "I see a person who's definitely going to relate to at least 3 memes today.",
  "You look like you have a love-hate relationship with your alarm clock.",
  "Your reflection shows someone who's mastered the art of productive procrastination."
];

const MIRROR_MOODS = [
  { mood: 'Brutally Honest', emoji: '😤', chance: 0.3 },
  { mood: 'Surprisingly Kind', emoji: '😊', chance: 0.2 },
  { mood: 'Sarcastic', emoji: '🙄', chance: 0.3 },
  { mood: 'Philosophical', emoji: '🤔', chance: 0.2 }
];

export const HonestMirrorWidget: React.FC<HonestMirrorWidgetProps> = ({ widget }) => {
  const [reflection, setReflection] = useState('');
  const [mirrorMood, setMirrorMood] = useState<any>(null);
  const [isReflecting, setIsReflecting] = useState(false);
  const [lookCount, setLookCount] = useState(0);

  const lookInMirror = () => {
    setIsReflecting(true);
    setReflection('');
    setMirrorMood(null);
    setLookCount(prev => prev + 1);
    
    setTimeout(() => {
      // Determine mirror mood
      const randomValue = Math.random();
      let cumulativeChance = 0;
      let selectedMood = MIRROR_MOODS[0];
      
      for (const mood of MIRROR_MOODS) {
        cumulativeChance += mood.chance;
        if (randomValue <= cumulativeChance) {
          selectedMood = mood;
          break;
        }
      }
      
      const randomReflection = HONEST_REFLECTIONS[Math.floor(Math.random() * HONEST_REFLECTIONS.length)];
      setReflection(randomReflection);
      setMirrorMood(selectedMood);
      setIsReflecting(false);
    }, 2500);
  };

  const reset = () => {
    setReflection('');
    setMirrorMood(null);
    setIsReflecting(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🪞</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
        <p className="text-gray-500 text-sm mt-2">
          Reflections that tell you what you need to hear
        </p>
      </div>
      
      <div className="text-center">
        <div className="relative">
          <div className={`w-64 h-80 mx-auto bg-gray-800 border-4 border-gray-600 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${
            isReflecting ? 'animate-pulse' : 'hover:border-white'
          }`}
          onClick={!isReflecting ? lookInMirror : undefined}>
            {isReflecting ? (
              <div className="text-4xl animate-spin">🌀</div>
            ) : reflection ? (
              <div className="text-6xl">{mirrorMood?.emoji}</div>
            ) : (
              <div className="text-gray-400 text-center p-4">
                <div className="text-4xl mb-2">👤</div>
                <p className="text-sm">Click to look in the mirror</p>
              </div>
            )}
          </div>
          
          {!isReflecting && !reflection && (
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <p className="text-gray-500 text-xs">Mirror, mirror on the wall...</p>
            </div>
          )}
        </div>
      </div>
      
      {isReflecting && (
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-2">
            <div className="animate-pulse text-2xl">🪞</div>
            <div className="animate-bounce text-2xl">👁️</div>
            <div className="animate-pulse text-2xl">✨</div>
          </div>
          <p className="text-gray-400 text-sm">
            The mirror is analyzing your essence...
          </p>
        </div>
      )}
      
      {reflection && !isReflecting && (
        <div className="space-y-4">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">{mirrorMood?.emoji}</div>
              <h3 className="text-white font-bold text-lg">
                Mirror Mood: {mirrorMood?.mood}
              </h3>
            </div>
            
            <div className="bg-black p-6 rounded border border-gray-600">
              <h4 className="text-white font-bold mb-3">🪞 Your Reflection Says:</h4>
              <p className="text-gray-300 text-lg leading-relaxed italic">
                "{reflection}"
              </p>
            </div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded border border-gray-600 text-center">
            <p className="text-gray-400 text-sm">
              🔮 Honesty Level: {mirrorMood?.mood === 'Brutally Honest' ? '100%' : 
                                mirrorMood?.mood === 'Surprisingly Kind' ? '25%' :
                                mirrorMood?.mood === 'Sarcastic' ? '85%' : '60%'}
            </p>
          </div>
        </div>
      )}
      
      {reflection && (
        <div className="text-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-black border border-white text-white font-mono text-sm
                       hover:bg-white hover:text-black transition-all duration-300"
          >
            Look Again
          </button>
        </div>
      )}
      
      {lookCount > 0 && (
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            Mirror consultations: {lookCount}
          </p>
          {lookCount >= 5 && (
            <p className="text-gray-600 text-xs mt-1">
              The mirror is getting tired of your vanity.
            </p>
          )}
        </div>
      )}
      
      <div className="text-center">
        <p className="text-gray-600 text-xs italic">
          Warning: This mirror has no filter and questionable judgment
        </p>
      </div>
    </div>
  );
};