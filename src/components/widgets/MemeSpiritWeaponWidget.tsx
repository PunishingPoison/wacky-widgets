import React, { useState } from 'react';
import { Widget } from '../../types/reddit';
import { SPIRIT_WEAPONS } from '../../utils/widgetGenerator';

interface MemeSpiritWeaponWidgetProps {
  widget: Widget;
}

const BATTLE_MOODS = [
  { id: 'aggressive', label: 'Aggressively Chaotic 🔥', emoji: '🔥' },
  { id: 'passive', label: 'Passive Aggressive 😤', emoji: '😤' },
  { id: 'sleepy', label: 'Sleepy but Dangerous 😴', emoji: '😴' },
  { id: 'caffeinated', label: 'Over-Caffeinated ☕', emoji: '☕' },
  { id: 'existential', label: 'Existential Crisis Mode 🤔', emoji: '🤔' },
  { id: 'unhinged', label: 'Completely Unhinged 🤡', emoji: '🤡' }
];

export const MemeSpiritWeaponWidget: React.FC<MemeSpiritWeaponWidgetProps> = ({ widget }) => {
  const [selectedMood, setSelectedMood] = useState('');
  const [weapon, setWeapon] = useState<any>(null);
  const [isForging, setIsForging] = useState(false);

  const forgeWeapon = () => {
    if (!selectedMood) return;
    
    setIsForging(true);
    setWeapon(null);
    
    setTimeout(() => {
      const randomWeapon = SPIRIT_WEAPONS[Math.floor(Math.random() * SPIRIT_WEAPONS.length)];
      setWeapon(randomWeapon);
      setIsForging(false);
    }, 2500);
  };

  const reset = () => {
    setSelectedMood('');
    setWeapon(null);
    setIsForging(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">⚔️</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-3">
            Choose your battle mood:
          </label>
          <div className="grid grid-cols-2 gap-3">
            {BATTLE_MOODS.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`p-3 border-2 font-mono text-sm transition-all duration-300 ${
                  selectedMood === mood.id
                    ? 'border-white bg-white text-black'
                    : 'border-gray-600 text-gray-300 hover:border-white hover:text-white'
                }`}
                disabled={isForging}
              >
                {mood.label}
              </button>
            ))}
          </div>
        </div>
        
        <button
          onClick={forgeWeapon}
          disabled={!selectedMood || isForging}
          className="w-full px-6 py-3 bg-black border-2 border-white text-white font-mono font-bold
                     hover:bg-white hover:text-black transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
        >
          {isForging ? 'FORGING YOUR WEAPON OF CHAOS...' : 'FORGE MY SPIRIT WEAPON'}
        </button>
      </div>
      
      {isForging && (
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-2">
            <div className="animate-bounce text-2xl">🔨</div>
            <div className="animate-pulse text-2xl">⚡</div>
            <div className="animate-spin text-2xl">🌀</div>
          </div>
          <p className="text-gray-400 text-sm">
            The meme gods are crafting your weapon of mass confusion...
          </p>
        </div>
      )}
      
      {weapon && !isForging && (
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 text-center">
          <div className="text-6xl mb-4">{weapon.emoji}</div>
          <h3 className="text-white text-2xl font-bold mb-2">
            {weapon.weapon}
          </h3>
          <div className="bg-gray-800 p-4 rounded border border-gray-600 mb-4">
            <p className="text-gray-300 text-lg">
              <strong>Special Power:</strong> {weapon.power}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-400 text-sm">
              Battle Mood: {BATTLE_MOODS.find(m => m.id === selectedMood)?.label}
            </p>
            <p className="text-gray-500 text-xs">
              Your weapon has been forged from pure internet chaos and questionable life choices.
            </p>
          </div>
        </div>
      )}
      
      {weapon && (
        <div className="text-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-black border border-white text-white font-mono text-sm
                       hover:bg-white hover:text-black transition-all duration-300"
          >
            Forge New Weapon
          </button>
        </div>
      )}
    </div>
  );
};