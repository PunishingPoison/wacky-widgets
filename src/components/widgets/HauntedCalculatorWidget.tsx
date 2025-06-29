import React, { useState } from 'react';
import { Widget } from '../../types/reddit';

interface HauntedCalculatorWidgetProps {
  widget: Widget;
}

export const HauntedCalculatorWidget: React.FC<HauntedCalculatorWidgetProps> = ({ widget }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [hauntedMessages, setHauntedMessages] = useState<string[]>([]);
  const [isHaunted, setIsHaunted] = useState(false);

  const hauntedResponses = [
    "666... always 666...",
    "The numbers... they whisper to me...",
    "ERROR: SOUL NOT FOUND",
    "13... it's always 13...",
    "Your calculations disturb the spirits",
    "The ghost in the machine says: WRONG",
    "Boo! Did I scare your math?",
    "The answer is 42... it's always 42...",
    "Math is dead. You killed it.",
    "The spirits demand better equations"
  ];

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
    
    // Random haunting
    if (Math.random() < 0.3) {
      triggerHaunting();
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
      
      // Haunted calculations
      if (newValue === 666 || newValue === 13 || newValue === 42) {
        triggerSpecialHaunting(newValue);
      }
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return secondValue !== 0 ? firstValue / secondValue : 666; // Haunted division by zero
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      
      // Haunted results
      if (Math.random() < 0.4) {
        const hauntedValue = [666, 13, 42, 0, 404][Math.floor(Math.random() * 5)];
        setDisplay(String(hauntedValue));
        triggerSpecialHaunting(hauntedValue);
      } else {
        setDisplay(String(newValue));
        if (newValue === 666 || newValue === 13 || newValue === 42) {
          triggerSpecialHaunting(newValue);
        }
      }

      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    setHauntedMessages([]);
    setIsHaunted(false);
  };

  const triggerHaunting = () => {
    setIsHaunted(true);
    const message = hauntedResponses[Math.floor(Math.random() * hauntedResponses.length)];
    setHauntedMessages(prev => [...prev, message].slice(-3)); // Keep last 3 messages
    
    setTimeout(() => setIsHaunted(false), 1000);
  };

  const triggerSpecialHaunting = (value: number) => {
    setIsHaunted(true);
    let message = "";
    
    switch (value) {
      case 666:
        message = "👹 THE NUMBER OF THE BEAST! THE CALCULATOR IS POSSESSED!";
        break;
      case 13:
        message = "🔮 Unlucky number detected! The spirits are restless!";
        break;
      case 42:
        message = "🌌 The answer to life, the universe, and everything!";
        break;
      case 404:
        message = "❌ ERROR: Math not found!";
        break;
      default:
        message = "👻 The spirits have spoken through mathematics!";
    }
    
    setHauntedMessages(prev => [...prev, message].slice(-3));
    setTimeout(() => setIsHaunted(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🧮</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
        <p className="text-gray-500 text-sm mt-2">
          Math, but cursed. The numbers don't add up... literally!
        </p>
      </div>
      
      {/* Calculator */}
      <div className={`max-w-sm mx-auto bg-gray-900 border-2 rounded-lg p-4 transition-all duration-300 ${
        isHaunted ? 'border-red-500 animate-pulse' : 'border-gray-700'
      }`}>
        {/* Display */}
        <div className={`bg-black p-4 rounded mb-4 border-2 transition-colors ${
          isHaunted ? 'border-red-500' : 'border-gray-600'
        }`}>
          <div className={`text-right text-2xl font-mono transition-colors ${
            isHaunted ? 'text-red-400' : 'text-white'
          }`}>
            {display}
          </div>
        </div>
        
        {/* Buttons */}
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={clear}
            className="col-span-2 p-3 bg-red-900 border border-red-700 text-red-300 font-mono font-bold
                       hover:bg-red-800 transition-colors"
          >
            CLEAR
          </button>
          <button
            onClick={() => inputOperation('/')}
            className="p-3 bg-gray-800 border border-gray-600 text-gray-300 font-mono font-bold
                       hover:bg-gray-700 transition-colors"
          >
            ÷
          </button>
          <button
            onClick={() => inputOperation('*')}
            className="p-3 bg-gray-800 border border-gray-600 text-gray-300 font-mono font-bold
                       hover:bg-gray-700 transition-colors"
          >
            ×
          </button>
          
          {/* Number buttons */}
          {[7, 8, 9].map(num => (
            <button
              key={num}
              onClick={() => inputNumber(String(num))}
              className="p-3 bg-black border border-white text-white font-mono font-bold
                         hover:bg-white hover:text-black transition-colors"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => inputOperation('-')}
            className="p-3 bg-gray-800 border border-gray-600 text-gray-300 font-mono font-bold
                       hover:bg-gray-700 transition-colors"
          >
            -
          </button>
          
          {[4, 5, 6].map(num => (
            <button
              key={num}
              onClick={() => inputNumber(String(num))}
              className="p-3 bg-black border border-white text-white font-mono font-bold
                         hover:bg-white hover:text-black transition-colors"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => inputOperation('+')}
            className="p-3 bg-gray-800 border border-gray-600 text-gray-300 font-mono font-bold
                       hover:bg-gray-700 transition-colors"
          >
            +
          </button>
          
          {[1, 2, 3].map(num => (
            <button
              key={num}
              onClick={() => inputNumber(String(num))}
              className="p-3 bg-black border border-white text-white font-mono font-bold
                         hover:bg-white hover:text-black transition-colors"
            >
              {num}
            </button>
          ))}
          <button
            onClick={performCalculation}
            className="row-span-2 p-3 bg-green-900 border border-green-700 text-green-300 font-mono font-bold
                       hover:bg-green-800 transition-colors"
          >
            =
          </button>
          
          <button
            onClick={() => inputNumber('0')}
            className="col-span-2 p-3 bg-black border border-white text-white font-mono font-bold
                       hover:bg-white hover:text-black transition-colors"
          >
            0
          </button>
          <button
            onClick={() => inputNumber('.')}
            className="p-3 bg-black border border-white text-white font-mono font-bold
                       hover:bg-white hover:text-black transition-colors"
          >
            .
          </button>
        </div>
      </div>
      
      {/* Haunted Messages */}
      {hauntedMessages.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-red-400 font-bold text-center">👻 Ghostly Messages:</h4>
          {hauntedMessages.map((message, index) => (
            <div key={index} className="bg-red-900 p-3 rounded border border-red-700 text-center">
              <p className="text-red-100 text-sm font-mono">{message}</p>
            </div>
          ))}
        </div>
      )}
      
      <div className="text-center">
        <p className="text-gray-600 text-xs italic">
          Warning: This calculator is possessed by the ghost of failed math tests
        </p>
      </div>
    </div>
  );
};