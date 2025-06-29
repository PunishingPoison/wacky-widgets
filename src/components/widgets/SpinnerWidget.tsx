import React, { useState } from 'react';
import { Widget } from '../../types/reddit';

interface SpinnerWidgetProps {
  widget: Widget;
}

const RESPONSES = [
  'Maybe', 'Probably Maybe', 'Maybe Not', 'Definitely Maybe', 
  'Perhaps', 'Could Be', 'Might Be', 'Maybe?', 'Possibly Maybe',
  'Uncertain Maybe', 'Absolutely Maybe', 'Maybe Indeed'
];

export const SpinnerWidget: React.FC<SpinnerWidgetProps> = ({ widget }) => {
  const [result, setResult] = useState<string>('');
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = () => {
    setIsSpinning(true);
    setResult('');
    
    setTimeout(() => {
      const randomResult = RESPONSES[Math.floor(Math.random() * RESPONSES.length)];
      setResult(randomResult);
      setIsSpinning(false);
    }, 2000);
  };

  return (
    <div className="text-center space-y-6">
      <p className="text-gray-300 text-lg">{widget.content}</p>
      
      <div className="relative">
        <div 
          className={`w-32 h-32 mx-auto border-4 border-white rounded-full flex items-center justify-center
                     transition-transform duration-2000 ${isSpinning ? 'animate-spin' : ''}`}
        >
          <div className="text-2xl">🎯</div>
        </div>
        
        {result && !isSpinning && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black border border-white px-4 py-2 rounded font-mono font-bold">
              {result}
            </div>
          </div>
        )}
      </div>
      
      <button
        onClick={spin}
        disabled={isSpinning}
        className="px-6 py-3 bg-black border-2 border-white text-white font-mono font-bold
                   hover:bg-white hover:text-black transition-all duration-300 
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSpinning ? 'SPINNING...' : 'SPIN THE WHEEL'}
      </button>
      
      {result && (
        <p className="text-gray-500 text-sm">
          The universe has spoken: {result}
        </p>
      )}
    </div>
  );
};