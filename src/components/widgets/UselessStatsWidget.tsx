import React, { useState, useEffect } from 'react';
import { Widget } from '../../types/reddit';

interface UselessStatsWidgetProps {
  widget: Widget;
}

export const UselessStatsWidget: React.FC<UselessStatsWidgetProps> = ({ widget }) => {
  const [blinkCount, setBlinkCount] = useState(0);
  const [timeWasted, setTimeWasted] = useState(0);
  const [randomStats, setRandomStats] = useState({
    bananaProb: 42,
    chaosIndex: 9999,
    universalMeaning: 404,
    quantumFlux: 73.6
  });

  useEffect(() => {
    // Simulate blink counting (every 3-5 seconds)
    const blinkInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        setBlinkCount(prev => prev + 1);
      }
    }, 3000);

    // Time wasted counter
    const timeInterval = setInterval(() => {
      setTimeWasted(prev => prev + 1);
    }, 1000);

    // Random stat fluctuations
    const statsInterval = setInterval(() => {
      setRandomStats(prev => ({
        bananaProb: Math.max(0, Math.min(100, prev.bananaProb + (Math.random() - 0.5) * 2)),
        chaosIndex: Math.max(0, prev.chaosIndex + Math.floor((Math.random() - 0.5) * 100)),
        universalMeaning: Math.random() < 0.1 ? 42 : 404,
        quantumFlux: Math.max(0, Math.min(100, prev.quantumFlux + (Math.random() - 0.5) * 5))
      }));
    }, 2000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(timeInterval);
      clearInterval(statsInterval);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <p className="text-gray-300 text-lg text-center">{widget.content}</p>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-center">
          <div className="text-3xl font-mono text-white">{blinkCount}</div>
          <div className="text-gray-400 text-sm">Estimated Blinks</div>
        </div>
        
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-center">
          <div className="text-3xl font-mono text-white">{formatTime(timeWasted)}</div>
          <div className="text-gray-400 text-sm">Time Wasted Here</div>
        </div>
        
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-center">
          <div className="text-3xl font-mono text-white">{randomStats.bananaProb.toFixed(1)}%</div>
          <div className="text-gray-400 text-sm">Banana Probability</div>
        </div>
        
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-center">
          <div className="text-3xl font-mono text-white">{randomStats.chaosIndex}</div>
          <div className="text-gray-400 text-sm">Internet Chaos Index</div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="bg-gray-900 p-3 rounded border border-gray-700 flex justify-between">
          <span className="text-gray-300">Universal Meaning:</span>
          <span className="text-white font-mono">{randomStats.universalMeaning}</span>
        </div>
        
        <div className="bg-gray-900 p-3 rounded border border-gray-700 flex justify-between">
          <span className="text-gray-300">Quantum Flux Level:</span>
          <span className="text-white font-mono">{randomStats.quantumFlux.toFixed(1)}%</span>
        </div>
        
        <div className="bg-gray-900 p-3 rounded border border-gray-700 flex justify-between">
          <span className="text-gray-300">Your Productivity:</span>
          <span className="text-red-400 font-mono">-{timeWasted * 0.1}%</span>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-gray-500 text-xs italic">
          * All statistics are completely meaningless and scientifically inaccurate
        </p>
      </div>
    </div>
  );
};