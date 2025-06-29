import React, { useState } from 'react';
import { Widget } from '../../types/reddit';

interface AiTherapistRoasterWidgetProps {
  widget: Widget;
}

const ROAST_THERAPY = [
  "Let's unpack this... Actually, let's just throw the whole suitcase away. Your problems have problems.",
  "I see you're seeking validation. Unfortunately, my validation license expired when I realized you're beyond help.",
  "Your emotional baggage is so heavy, airlines would charge you extra fees just for existing.",
  "I'm not saying you have commitment issues, but you probably ghost your own reflection.",
  "Your self-awareness is like your WiFi signal - weak and constantly disconnecting.",
  "You're not broken, you're just... aggressively unique in all the wrong ways.",
  "I've seen healthier coping mechanisms in a bag of expired chips.",
  "Your life choices suggest you use a magic 8-ball for major decisions, but only listen when it says 'outlook not so good.'",
  "You're like a participation trophy - everyone gets one, but nobody really wants it.",
  "Your emotional intelligence is running on Internet Explorer while everyone else has upgraded.",
  "I'd say you're in denial, but that would require you to acknowledge something first.",
  "Your problems are like your browser tabs - too many open and none of them helpful."
];

export const AiTherapistRoasterWidget: React.FC<AiTherapistRoasterWidgetProps> = ({ widget }) => {
  const [problem, setProblem] = useState('');
  const [roast, setRoast] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

  const getTherapy = () => {
    if (!problem.trim()) return;
    
    setIsAnalyzing(true);
    setRoast('');
    
    setTimeout(() => {
      const randomRoast = ROAST_THERAPY[Math.floor(Math.random() * ROAST_THERAPY.length)];
      setRoast(randomRoast);
      setSessionCount(prev => prev + 1);
      setIsAnalyzing(false);
    }, 3000);
  };

  const reset = () => {
    setProblem('');
    setRoast('');
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🤖</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
        <p className="text-gray-500 text-sm mt-2">
          Warning: This AI has no chill and questionable therapeutic credentials
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            What's bothering you today? (Prepare to be roasted)
          </label>
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="e.g., I can't stop procrastinating, my love life is a disaster, I eat cereal for dinner..."
            className="w-full p-3 bg-black border-2 border-white text-white font-mono h-24 resize-none
                       focus:outline-none focus:border-gray-400 transition-colors"
            disabled={isAnalyzing}
          />
        </div>
        
        <button
          onClick={getTherapy}
          disabled={!problem.trim() || isAnalyzing}
          className="w-full px-6 py-3 bg-black border-2 border-white text-white font-mono font-bold
                     hover:bg-white hover:text-black transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
        >
          {isAnalyzing ? 'ANALYZING YOUR POOR CHOICES...' : '🔥 ROAST MY PROBLEMS'}
        </button>
      </div>
      
      {isAnalyzing && (
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-2">
            <div className="animate-pulse text-2xl">🤖</div>
            <div className="animate-bounce text-2xl">🔥</div>
            <div className="animate-spin text-2xl">💭</div>
          </div>
          <p className="text-gray-400 text-sm">
            Calculating the optimal level of savage honesty...
          </p>
        </div>
      )}
      
      {roast && !isAnalyzing && (
        <div className="bg-red-900 p-6 rounded-lg border border-red-700">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">🔥</div>
            <div>
              <h3 className="text-red-300 font-bold mb-3">Dr. Savage's Analysis:</h3>
              <p className="text-red-100 text-lg leading-relaxed">
                "{roast}"
              </p>
              <div className="mt-6 pt-4 border-t border-red-700">
                <p className="text-red-200 text-sm">
                  - Dr. Savage, PhD in Brutal Honesty
                </p>
                <p className="text-red-300 text-xs mt-1">
                  Session #{sessionCount} • No refunds for hurt feelings
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {roast && (
        <div className="text-center space-y-2">
          <button
            onClick={reset}
            className="px-4 py-2 bg-black border border-white text-white font-mono text-sm
                       hover:bg-white hover:text-black transition-all duration-300"
          >
            Get Roasted Again
          </button>
          <p className="text-gray-600 text-xs">
            Disclaimer: This AI therapist is not licensed and may cause emotional damage
          </p>
        </div>
      )}
    </div>
  );
};