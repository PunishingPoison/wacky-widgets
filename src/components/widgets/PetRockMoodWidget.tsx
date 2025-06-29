import React, { useState, useEffect } from 'react';
import { Widget } from '../../types/reddit';

interface PetRockMoodWidgetProps {
  widget: Widget;
}

const ROCK_MOODS = [
  { mood: 'Stoic', emoji: '🗿', description: 'Contemplating the meaning of existence and sedimentary layers.' },
  { mood: 'Grumpy', emoji: '😠', description: 'Annoyed by all the movement around here. Prefers stillness.' },
  { mood: 'Zen', emoji: '😌', description: 'Achieving perfect inner peace through complete immobility.' },
  { mood: 'Philosophical', emoji: '🤔', description: 'Pondering whether a rolling stone really gathers no moss.' },
  { mood: 'Sleepy', emoji: '😴', description: 'Been napping for approximately 3 million years. Still tired.' },
  { mood: 'Excited', emoji: '🤩', description: 'Someone moved it 2 inches to the left! Best day ever!' },
  { mood: 'Lonely', emoji: '😢', description: 'Wishes it had more rock friends. Considers pebbles beneath it.' },
  { mood: 'Mysterious', emoji: '🌚', description: 'Knows secrets of the earth but refuses to share them.' },
  { mood: 'Judgmental', emoji: '🙄', description: 'Silently judging your life choices from its corner.' },
  { mood: 'Optimistic', emoji: '😊', description: 'Believes that one day it might become a mountain.' }
];

const ROCK_THOUGHTS = [
  "I wonder what it's like to move...",
  "These humans are so restless. Don't they know the beauty of stillness?",
  "I've been here for 47 years and nobody has asked about my feelings until now.",
  "Sometimes I dream about being a diamond, but then I remember I'm happy being me.",
  "The dust on my surface tells stories of adventures I'll never have.",
  "I've seen 3,847 sunrises from this exact spot. Each one is different.",
  "That plant over there keeps growing. Show off.",
  "I'm not lazy, I'm energy efficient.",
  "My carbon dating profile says I'm 'vintage'.",
  "I've mastered the art of doing nothing. It's quite zen."
];

export const PetRockMoodWidget: React.FC<PetRockMoodWidgetProps> = ({ widget }) => {
  const [currentMood, setCurrentMood] = useState(ROCK_MOODS[0]);
  const [currentThought, setCurrentThought] = useState('');
  const [interactionCount, setInteractionCount] = useState(0);
  const [lastInteraction, setLastInteraction] = useState<Date | null>(null);

  useEffect(() => {
    // Rock changes mood slowly over time
    const moodInterval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every 10 seconds
        const newMood = ROCK_MOODS[Math.floor(Math.random() * ROCK_MOODS.length)];
        setCurrentMood(newMood);
      }
    }, 10000);

    return () => clearInterval(moodInterval);
  }, []);

  const interactWithRock = () => {
    setInteractionCount(prev => prev + 1);
    setLastInteraction(new Date());
    
    // Rock responds to interaction
    const randomThought = ROCK_THOUGHTS[Math.floor(Math.random() * ROCK_THOUGHTS.length)];
    setCurrentThought(randomThought);
    
    // Chance to change mood when interacted with
    if (Math.random() < 0.6) {
      const newMood = ROCK_MOODS[Math.floor(Math.random() * ROCK_MOODS.length)];
      setCurrentMood(newMood);
    }
  };

  const getTimeSinceLastInteraction = () => {
    if (!lastInteraction) return null;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - lastInteraction.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  };

  const getRockSize = () => {
    // Rock grows slightly with more interactions (very slowly)
    const baseSize = 8;
    const growthFactor = Math.min(interactionCount * 0.1, 2);
    return baseSize + growthFactor;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🪨</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
        <p className="text-gray-500 text-sm mt-2">
          Your rock has feelings. Deep, geological feelings.
        </p>
      </div>
      
      {/* Pet Rock Display */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 text-center">
        <div 
          className="cursor-pointer transition-transform duration-300 hover:scale-105"
          onClick={interactWithRock}
          style={{ fontSize: `${getRockSize()}rem` }}
        >
          {currentMood.emoji}
        </div>
        
        <div className="mt-4 space-y-2">
          <h3 className="text-white font-bold text-xl">
            Current Mood: {currentMood.mood}
          </h3>
          <p className="text-gray-300 text-sm">
            {currentMood.description}
          </p>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Age:</span>
              <p className="text-white font-mono">~3.2 million years</p>
            </div>
            <div>
              <span className="text-gray-400">Interactions:</span>
              <p className="text-white font-mono">{interactionCount}</p>
            </div>
          </div>
          
          {lastInteraction && (
            <div className="mt-2">
              <span className="text-gray-400 text-xs">
                Last petted: {getTimeSinceLastInteraction()}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Rock's Thoughts */}
      {currentThought && (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">💭</div>
            <div>
              <h4 className="text-white font-bold mb-2">Your Rock is Thinking:</h4>
              <p className="text-gray-300 italic">"{currentThought}"</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Care Instructions */}
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
        <h4 className="text-white font-bold mb-3">🪨 Pet Rock Care Guide:</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-green-400">✓</span>
            <span className="text-gray-300">Provide a stable surface</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-400">✓</span>
            <span className="text-gray-300">Occasional dusting (optional)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-400">✓</span>
            <span className="text-gray-300">Click to show affection</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-red-400">✗</span>
            <span className="text-gray-300">Do not feed (rocks don't eat)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-red-400">✗</span>
            <span className="text-gray-300">Avoid sudden movements</span>
          </div>
        </div>
      </div>
      
      {interactionCount >= 10 && (
        <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-4 text-center">
          <p className="text-yellow-300 font-bold">🏆 Achievement Unlocked!</p>
          <p className="text-yellow-200 text-sm">
            "Rock Whisperer" - You've interacted with your pet rock {interactionCount} times!
          </p>
        </div>
      )}
      
      <div className="text-center">
        <p className="text-gray-600 text-xs italic">
          Your pet rock appreciates your patience and understanding of its sedentary lifestyle.
        </p>
      </div>
    </div>
  );
};