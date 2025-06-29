import React, { useState } from 'react';
import { Widget } from '../../types/reddit';

interface LifeAchievementUnlockedWidgetProps {
  widget: Widget;
}

const LIFE_ACHIEVEMENTS = [
  {
    title: "Procrastination Master",
    description: "Successfully avoided doing important tasks for 3 consecutive hours",
    points: 50,
    rarity: "Common",
    icon: "⏰"
  },
  {
    title: "Social Media Archaeologist",
    description: "Scrolled so far back you found posts from 2019",
    points: 75,
    rarity: "Uncommon",
    icon: "📱"
  },
  {
    title: "Midnight Snack Champion",
    description: "Ate cereal at 2 AM and felt no shame",
    points: 100,
    rarity: "Rare",
    icon: "🥣"
  },
  {
    title: "WiFi Whisperer",
    description: "Fixed the internet by turning it off and on again",
    points: 125,
    rarity: "Epic",
    icon: "📶"
  },
  {
    title: "Plant Parent Survivor",
    description: "Kept a houseplant alive for more than 2 weeks",
    points: 200,
    rarity: "Legendary",
    icon: "🌱"
  },
  {
    title: "Laundry Procrastinator",
    description: "Wore the same shirt 3 days in a row because laundry is hard",
    points: 25,
    rarity: "Common",
    icon: "👕"
  },
  {
    title: "Delivery App Expert",
    description: "Ordered food delivery 5 times this week",
    points: 80,
    rarity: "Uncommon",
    icon: "🚚"
  },
  {
    title: "Meeting Mute Master",
    description: "Successfully stayed on mute for an entire video call",
    points: 60,
    rarity: "Common",
    icon: "🔇"
  },
  {
    title: "Password Forgetter",
    description: "Reset your password 3 times for the same account",
    points: 40,
    rarity: "Common",
    icon: "🔐"
  },
  {
    title: "Binge Watch Champion",
    description: "Watched an entire season in one sitting",
    points: 150,
    rarity: "Rare",
    icon: "📺"
  },
  {
    title: "Autocorrect Victim",
    description: "Sent a text that was completely changed by autocorrect",
    points: 35,
    rarity: "Common",
    icon: "📝"
  },
  {
    title: "Existential Crisis Survivor",
    description: "Had a deep philosophical moment at 3 AM",
    points: 300,
    rarity: "Mythic",
    icon: "🤔"
  }
];

export const LifeAchievementUnlockedWidget: React.FC<LifeAchievementUnlockedWidgetProps> = ({ widget }) => {
  const [achievement, setAchievement] = useState<any>(null);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [achievementCount, setAchievementCount] = useState(0);

  const unlockAchievement = () => {
    setIsUnlocking(true);
    setAchievement(null);
    
    setTimeout(() => {
      const randomAchievement = LIFE_ACHIEVEMENTS[Math.floor(Math.random() * LIFE_ACHIEVEMENTS.length)];
      setAchievement(randomAchievement);
      setTotalPoints(prev => prev + randomAchievement.points);
      setAchievementCount(prev => prev + 1);
      setIsUnlocking(false);
    }, 2500);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-400';
      case 'Uncommon': return 'text-green-400';
      case 'Rare': return 'text-blue-400';
      case 'Epic': return 'text-purple-400';
      case 'Legendary': return 'text-yellow-400';
      case 'Mythic': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'border-gray-600';
      case 'Uncommon': return 'border-green-600';
      case 'Rare': return 'border-blue-600';
      case 'Epic': return 'border-purple-600';
      case 'Legendary': return 'border-yellow-600';
      case 'Mythic': return 'border-red-600';
      default: return 'border-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🏆</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
        <p className="text-gray-500 text-sm mt-2">
          Celebrating your most mundane accomplishments
        </p>
      </div>
      
      {/* Stats */}
      {(totalPoints > 0 || achievementCount > 0) && (
        <div className="bg-gray-900 p-4 rounded border border-gray-700">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-mono text-yellow-400">{totalPoints}</div>
              <div className="text-gray-400 text-sm">Life Points</div>
            </div>
            <div>
              <div className="text-2xl font-mono text-blue-400">{achievementCount}</div>
              <div className="text-gray-400 text-sm">Achievements</div>
            </div>
          </div>
        </div>
      )}
      
      <div className="text-center">
        <button
          onClick={unlockAchievement}
          disabled={isUnlocking}
          className="px-6 py-3 bg-black border-2 border-white text-white font-mono font-bold
                     hover:bg-white hover:text-black transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUnlocking ? 'UNLOCKING ACHIEVEMENT...' : '🏆 UNLOCK ACHIEVEMENT'}
        </button>
      </div>
      
      {isUnlocking && (
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-2">
            <div className="animate-bounce text-2xl">🏆</div>
            <div className="animate-pulse text-2xl">✨</div>
            <div className="animate-bounce text-2xl">🎉</div>
          </div>
          <p className="text-gray-400 text-sm">
            Scanning your life for notable accomplishments...
          </p>
        </div>
      )}
      
      {achievement && !isUnlocking && (
        <div className="space-y-4">
          <div className={`bg-gray-900 p-6 rounded-lg border-2 ${getRarityBorder(achievement.rarity)} relative overflow-hidden`}>
            {/* Achievement Unlocked Header */}
            <div className="text-center mb-6">
              <div className="text-yellow-400 font-bold text-lg mb-2">🎉 ACHIEVEMENT UNLOCKED! 🎉</div>
              <div className={`text-sm font-mono ${getRarityColor(achievement.rarity)}`}>
                {achievement.rarity.toUpperCase()}
              </div>
            </div>
            
            {/* Achievement Details */}
            <div className="text-center">
              <div className="text-6xl mb-4">{achievement.icon}</div>
              <h3 className="text-white font-bold text-2xl mb-2">
                {achievement.title}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                {achievement.description}
              </p>
              
              <div className="bg-black p-4 rounded border border-gray-600">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Points Earned:</span>
                  <span className="text-yellow-400 font-mono font-bold text-xl">
                    +{achievement.points}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Sparkle effects for rare achievements */}
            {['Epic', 'Legendary', 'Mythic'].includes(achievement.rarity) && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-2 right-2 text-yellow-400 animate-pulse">✨</div>
                <div className="absolute bottom-2 left-2 text-yellow-400 animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
                <div className="absolute top-1/2 left-2 text-yellow-400 animate-pulse" style={{ animationDelay: '1s' }}>⭐</div>
                <div className="absolute top-2 left-1/2 text-yellow-400 animate-pulse" style={{ animationDelay: '1.5s' }}>⭐</div>
              </div>
            )}
          </div>
          
          <div className="bg-gray-800 p-4 rounded border border-gray-600 text-center">
            <p className="text-gray-400 text-sm">
              🎮 Achievement #{achievementCount} • Total Score: {totalPoints} points
            </p>
          </div>
        </div>
      )}
      
      <div className="text-center">
        <p className="text-gray-600 text-xs italic">
          Life achievements: Because someone should celebrate your small victories
        </p>
      </div>
    </div>
  );
};