import React, { useState } from 'react';
import { Widget } from '../../types/reddit';

interface TimeTravelerDiaryWidgetProps {
  widget: Widget;
}

const DIARY_ENTRIES = [
  {
    date: "March 15, 44 BC",
    entry: "Tried to warn Caesar about the Ides of March. He thought I was selling him a calendar app. Humans are so primitive in this era.",
    mood: "Frustrated 😤"
  },
  {
    date: "April 14, 1912",
    entry: "Boarded the Titanic to prevent disaster. Spent entire voyage arguing with captain about icebergs. He said I was being 'dramatic.' Currently writing this from a lifeboat.",
    mood: "Vindicated but Cold 🧊"
  },
  {
    date: "October 29, 1969",
    entry: "Witnessed the first internet message. It was supposed to say 'LOGIN' but crashed after 'LO'. Even in the future, technology is still buggy.",
    mood: "Nostalgic 📡"
  },
  {
    date: "December 31, 1999",
    entry: "Y2K preparations are hilarious. People think computers will destroy civilization. If only they knew about social media in 2020.",
    mood: "Amused 😏"
  },
  {
    date: "January 9, 2007",
    entry: "Steve Jobs just announced the iPhone. Everyone thinks it's revolutionary. Wait until they discover TikTok dances.",
    mood: "Prophetic 🔮"
  },
  {
    date: "March 11, 2020",
    entry: "WHO declares pandemic. Bought toilet paper stocks yesterday. Time travel has its perks. Also, humans still haven't learned to wash their hands properly.",
    mood: "Prepared but Disappointed 🦠"
  },
  {
    date: "February 30, 2157",
    entry: "Visited the day they finally fixed the calendar. February now has 30 days. Mathematicians are having existential crises.",
    mood: "Confused ⏰"
  },
  {
    date: "July 4, 1776",
    entry: "Attended the signing of the Declaration of Independence. Hamilton kept asking if I knew any good musicals about him. Awkward.",
    mood: "Historically Awkward 🎭"
  },
  {
    date: "November 9, 1989",
    entry: "Berlin Wall came down today. Helped by accidentally backing my time machine into it. Sometimes history needs a little push.",
    mood: "Accidentally Heroic 🧱"
  },
  {
    date: "August 15, 3021",
    entry: "Humans finally achieved world peace. Turns out all it took was universal WiFi and free pizza. Who knew?",
    mood: "Optimistic 🍕"
  }
];

export const TimeTravelerDiaryWidget: React.FC<TimeTravelerDiaryWidgetProps> = ({ widget }) => {
  const [currentEntry, setCurrentEntry] = useState<any>(null);
  const [isTimeJumping, setIsTimeJumping] = useState(false);

  const jumpToRandomTime = () => {
    setIsTimeJumping(true);
    setCurrentEntry(null);
    
    setTimeout(() => {
      const randomEntry = DIARY_ENTRIES[Math.floor(Math.random() * DIARY_ENTRIES.length)];
      setCurrentEntry(randomEntry);
      setIsTimeJumping(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">📖</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
        <p className="text-gray-500 text-sm mt-2">
          Emotional entries from across the timeline
        </p>
      </div>
      
      <div className="text-center">
        <button
          onClick={jumpToRandomTime}
          disabled={isTimeJumping}
          className="px-6 py-3 bg-black border-2 border-white text-white font-mono font-bold
                     hover:bg-white hover:text-black transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isTimeJumping ? 'TIME JUMPING...' : '⏰ RANDOM TIME JUMP'}
        </button>
      </div>
      
      {isTimeJumping && (
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-2">
            <div className="animate-spin text-2xl">🌀</div>
            <div className="animate-bounce text-2xl">⏰</div>
            <div className="animate-pulse text-2xl">✨</div>
          </div>
          <p className="text-gray-400 text-sm">
            Calibrating temporal coordinates...
          </p>
          <div className="text-gray-600 text-xs">
            Warning: May cause temporal displacement and existential confusion
          </div>
        </div>
      )}
      
      {currentEntry && !isTimeJumping && (
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <div className="bg-yellow-100 text-black p-6 rounded border-2 border-yellow-600" 
               style={{ fontFamily: 'cursive' }}>
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold">Time Traveler's Diary</h3>
              <p className="text-sm opacity-75">{currentEntry.date}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-base leading-relaxed">
                {currentEntry.entry}
              </p>
            </div>
            
            <div className="text-right">
              <p className="text-sm">
                <strong>Mood:</strong> {currentEntry.mood}
              </p>
              <p className="text-xs opacity-75 mt-2">
                - T.T. (Time Traveler)
              </p>
            </div>
          </div>
          
          <div className="mt-4 bg-gray-800 p-4 rounded border border-gray-600 text-center">
            <p className="text-gray-400 text-sm">
              📜 Diary Entry #{DIARY_ENTRIES.indexOf(currentEntry) + 1} of {DIARY_ENTRIES.length}
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Temporal authenticity not guaranteed
            </p>
          </div>
        </div>
      )}
    </div>
  );
};