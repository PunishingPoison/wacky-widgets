import React, { useState } from 'react';
import { Widget } from '../../types/reddit';

interface WrongHistoricalEventsWidgetProps {
  widget: Widget;
}

const WRONG_HISTORY = [
  {
    event: "The Great Fire of London (1666)",
    wrongVersion: "Started when someone left their medieval toaster on too long. The city burned for days because fire departments were still using stone age technology.",
    actualFact: "Actually started in a bakery on Pudding Lane"
  },
  {
    event: "Napoleon's Defeat at Waterloo (1815)",
    wrongVersion: "Napoleon lost because he forgot to charge his horse overnight. His cavalry was completely immobilized by dead batteries.",
    actualFact: "Lost due to strategic errors and coalition forces"
  },
  {
    event: "The Boston Tea Party (1773)",
    wrongVersion: "Colonists dumped tea because they were protesting the lack of coffee shops in Boston. Starbucks wouldn't be invented for another 200 years.",
    actualFact: "Protest against taxation without representation"
  },
  {
    event: "The Fall of the Berlin Wall (1989)",
    wrongVersion: "The wall fell because East Germans discovered Netflix and needed better internet connection. The wall was blocking their WiFi signal.",
    actualFact: "Result of political changes and peaceful revolution"
  },
  {
    event: "The Titanic Sinking (1912)",
    wrongVersion: "The ship sank because the captain was trying to take a selfie with the iceberg. Social media addiction was a problem even in 1912.",
    actualFact: "Struck an iceberg due to speed and poor visibility"
  },
  {
    event: "The Moon Landing (1969)",
    wrongVersion: "Neil Armstrong's first words were actually 'Is this thing on?' because he forgot to unmute his microphone during the livestream.",
    actualFact: "Said 'That's one small step for man, one giant leap for mankind'"
  },
  {
    event: "The Discovery of America (1492)",
    wrongVersion: "Columbus discovered America because he was following a GPS that had outdated maps. He was actually trying to find the nearest Taco Bell.",
    actualFact: "Was seeking a western route to Asia"
  },
  {
    event: "The Invention of the Telephone (1876)",
    wrongVersion: "Alexander Graham Bell invented the phone because he was tired of his mother texting him. The first phone call was 'Mom, just call me instead.'",
    actualFact: "Developed to transmit speech electrically"
  },
  {
    event: "The Wright Brothers' First Flight (1903)",
    wrongVersion: "The Wright Brothers achieved flight because they were late for a very important meeting and traffic was terrible. Necessity is the mother of aviation.",
    actualFact: "Result of systematic experimentation with gliders"
  },
  {
    event: "The Signing of the Declaration of Independence (1776)",
    wrongVersion: "The founding fathers signed the Declaration because they were tired of King George's spam emails about taxes. They invented America to get better email filters.",
    actualFact: "Declared independence from British rule"
  }
];

export const WrongHistoricalEventsWidget: React.FC<WrongHistoricalEventsWidgetProps> = ({ widget }) => {
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  const [showActualFact, setShowActualFact] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateWrongHistory = () => {
    setIsGenerating(true);
    setCurrentEvent(null);
    setShowActualFact(false);
    
    setTimeout(() => {
      const randomEvent = WRONG_HISTORY[Math.floor(Math.random() * WRONG_HISTORY.length)];
      setCurrentEvent(randomEvent);
      setIsGenerating(false);
    }, 2000);
  };

  const revealTruth = () => {
    setShowActualFact(true);
  };

  const reset = () => {
    setCurrentEvent(null);
    setShowActualFact(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">📚</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
        <p className="text-gray-500 text-sm mt-2">
          History lessons from an alternate reality
        </p>
      </div>
      
      <div className="text-center">
        <button
          onClick={generateWrongHistory}
          disabled={isGenerating}
          className="px-6 py-3 bg-black border-2 border-white text-white font-mono font-bold
                     hover:bg-white hover:text-black transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'REWRITING HISTORY...' : '📚 LEARN WRONG HISTORY'}
        </button>
      </div>
      
      {isGenerating && (
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-2">
            <div className="animate-spin text-2xl">📖</div>
            <div className="animate-bounce text-2xl">⏰</div>
            <div className="animate-pulse text-2xl">🤔</div>
          </div>
          <p className="text-gray-400 text-sm">
            Consulting alternate timeline textbooks...
          </p>
        </div>
      )}
      
      {currentEvent && !isGenerating && (
        <div className="space-y-4">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <h3 className="text-white font-bold text-xl mb-4 text-center">
              {currentEvent.event}
            </h3>
            
            <div className="bg-red-900 p-4 rounded border border-red-700 mb-4">
              <h4 className="text-red-300 font-bold mb-2">❌ Alternate Reality Version:</h4>
              <p className="text-red-100 leading-relaxed">
                {currentEvent.wrongVersion}
              </p>
            </div>
            
            {!showActualFact ? (
              <div className="text-center">
                <button
                  onClick={revealTruth}
                  className="px-4 py-2 bg-green-900 border border-green-700 text-green-300 font-mono
                             hover:bg-green-800 transition-colors"
                >
                  🔍 Reveal Actual History
                </button>
              </div>
            ) : (
              <div className="bg-green-900 p-4 rounded border border-green-700">
                <h4 className="text-green-300 font-bold mb-2">✅ What Actually Happened:</h4>
                <p className="text-green-100 leading-relaxed">
                  {currentEvent.actualFact}
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-gray-800 p-4 rounded border border-gray-600 text-center">
            <p className="text-gray-400 text-sm">
              📜 Historical Accuracy: 0% • Entertainment Value: 100%
            </p>
          </div>
        </div>
      )}
      
      {currentEvent && (
        <div className="text-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-black border border-white text-white font-mono text-sm
                       hover:bg-white hover:text-black transition-all duration-300"
          >
            Learn More Wrong History
          </button>
        </div>
      )}
    </div>
  );
};