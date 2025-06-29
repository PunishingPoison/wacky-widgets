import React, { useState } from 'react';
import { Widget } from '../../types/reddit';
import { FAKE_CONSPIRACIES } from '../../utils/widgetGenerator';

interface ConspiracyGeneratorWidgetProps {
  widget: Widget;
}

export const ConspiracyGeneratorWidget: React.FC<ConspiracyGeneratorWidgetProps> = ({ widget }) => {
  const [conspiracy, setConspiracy] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [beliefLevel, setBeliefLevel] = useState(0);

  const generateConspiracy = () => {
    setIsGenerating(true);
    setConspiracy('');
    setBeliefLevel(0);
    
    setTimeout(() => {
      const randomConspiracy = FAKE_CONSPIRACIES[Math.floor(Math.random() * FAKE_CONSPIRACIES.length)];
      setConspiracy(randomConspiracy);
      setBeliefLevel(Math.floor(Math.random() * 100) + 1);
      setIsGenerating(false);
    }, 2500);
  };

  const reset = () => {
    setConspiracy('');
    setBeliefLevel(0);
    setIsGenerating(false);
  };

  const getBeliefColor = () => {
    if (beliefLevel < 30) return 'text-green-400';
    if (beliefLevel < 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getBeliefLabel = () => {
    if (beliefLevel < 30) return 'Mildly Suspicious';
    if (beliefLevel < 70) return 'Highly Questionable';
    return 'DEFINITELY TRUE';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🕵️</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
      </div>
      
      <button
        onClick={generateConspiracy}
        disabled={isGenerating}
        className="w-full px-6 py-3 bg-black border-2 border-white text-white font-mono font-bold
                   hover:bg-white hover:text-black transition-all duration-300
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
      >
        {isGenerating ? 'UNCOVERING THE TRUTH...' : 'GENERATE CONSPIRACY'}
      </button>
      
      {isGenerating && (
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-2">
            <div className="animate-spin text-2xl">🌀</div>
            <div className="animate-pulse text-2xl">👁️</div>
            <div className="animate-bounce text-2xl">🔍</div>
          </div>
          <p className="text-gray-400 text-sm">
            Accessing classified information from the deep web...
          </p>
        </div>
      )}
      
      {conspiracy && !isGenerating && (
        <div className="space-y-4">
          <div className="bg-gray-900 p-6 rounded-lg border border-red-900 border-dashed relative">
            <div className="absolute -top-3 -right-3 text-2xl">🚨</div>
            <div className="flex items-start space-x-3">
              <div className="text-red-500 text-xl">⚠️</div>
              <div>
                <h3 className="text-red-300 font-bold mb-2">CLASSIFIED INFORMATION</h3>
                <p className="text-red-100 text-lg leading-relaxed">
                  {conspiracy}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded border border-gray-600">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Truth Level:</span>
              <span className={`font-mono font-bold ${getBeliefColor()}`}>
                {beliefLevel}% {getBeliefLabel()}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${
                  beliefLevel < 30 ? 'bg-green-400' : 
                  beliefLevel < 70 ? 'bg-yellow-400' : 'bg-red-400'
                }`}
                style={{ width: `${beliefLevel}%` }}
              ></div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 text-xs italic">
              Disclaimer: This conspiracy is 100% fabricated and not based on any real events. 
              Please don't start a cult.
            </p>
          </div>
        </div>
      )}
      
      {conspiracy && (
        <div className="text-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-black border border-white text-white font-mono text-sm
                       hover:bg-white hover:text-black transition-all duration-300"
          >
            Uncover New Truth
          </button>
        </div>
      )}
    </div>
  );
};