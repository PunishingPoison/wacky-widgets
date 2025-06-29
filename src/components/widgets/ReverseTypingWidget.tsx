import React, { useState, useEffect } from 'react';
import { Widget } from '../../types/reddit';

interface ReverseTypingWidgetProps {
  widget: Widget;
}

export const ReverseTypingWidget: React.FC<ReverseTypingWidgetProps> = ({ widget }) => {
  const [userInput, setUserInput] = useState('');
  const [correctChars, setCorrectChars] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  const targetText = widget.content;
  const reversedTarget = targetText.split('').reverse().join('');

  useEffect(() => {
    if (userInput.length === 1 && !startTime) {
      setStartTime(Date.now());
    }

    let correct = 0;
    for (let i = 0; i < Math.min(userInput.length, reversedTarget.length); i++) {
      if (userInput[i] === reversedTarget[i]) {
        correct++;
      } else {
        break;
      }
    }
    setCorrectChars(correct);

    if (userInput === reversedTarget && !isComplete) {
      setIsComplete(true);
      setEndTime(Date.now());
    }
  }, [userInput, reversedTarget, startTime, isComplete]);

  const handleReset = () => {
    setUserInput('');
    setCorrectChars(0);
    setIsComplete(false);
    setStartTime(null);
    setEndTime(null);
  };

  const getTimeTaken = () => {
    if (startTime && endTime) {
      return ((endTime - startTime) / 1000).toFixed(1);
    }
    return '0';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-gray-300 text-lg mb-4">Type this phrase backwards:</p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <p className="text-white text-xl font-mono">{targetText}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">Target (reversed):</p>
          <p className="text-gray-500 font-mono text-lg">{reversedTarget}</p>
        </div>

        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Start typing backwards..."
          className="w-full p-4 bg-black border-2 border-white text-white font-mono text-lg
                     focus:outline-none focus:border-gray-400 transition-colors"
          disabled={isComplete}
        />

        <div className="flex justify-between text-sm">
          <span className="text-gray-400">
            Correct characters: {correctChars}/{reversedTarget.length}
          </span>
          <span className="text-gray-400">
            Progress: {Math.round((correctChars / reversedTarget.length) * 100)}%
          </span>
        </div>

        <div className="w-full bg-gray-800 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${(correctChars / reversedTarget.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {isComplete && (
        <div className="text-center space-y-4 p-4 bg-gray-900 rounded-lg border border-green-700">
          <div className="text-4xl">🎉</div>
          <p className="text-green-400 font-bold">Congratulations!</p>
          <p className="text-gray-300">
            You completed it in {getTimeTaken()} seconds!
          </p>
          <p className="text-gray-500 text-sm">
            You've successfully wasted your time typing backwards. Well done!
          </p>
        </div>
      )}

      <div className="text-center">
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-black border border-white text-white font-mono
                     hover:bg-white hover:text-black transition-all duration-300"
        >
          Reset Challenge
        </button>
      </div>
    </div>
  );
};