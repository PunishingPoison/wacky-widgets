import React, { useState } from 'react';
import { Widget } from '../../types/reddit';

interface ConspiracyFortuneCookiesWidgetProps {
  widget: Widget;
}

const CONSPIRACY_FORTUNES = [
  "Your future is being monitored by interdimensional squirrels.",
  "Beware: Your coffee mug is reporting your caffeine intake to the government.",
  "The pigeons outside your window are actually tiny surveillance drones.",
  "Your horoscope is written by aliens who don't understand human emotions.",
  "The WiFi password you can't remember is actually a mind control code.",
  "Your phone's autocorrect is slowly rewriting your personality.",
  "The person reading this fortune is not who they think they are.",
  "Your shadow has been replaced by a more photogenic version.",
  "The moon landing was real, but they filmed it on Mars.",
  "Your lucky numbers are being used to track your location.",
  "The fortune cookie industry is run by time travelers from 2087.",
  "Your dreams are being livestreamed to an audience of confused cats.",
  "The real conspiracy is that there are no conspiracies, which is itself a conspiracy.",
  "Your reflection in mirrors is actually your evil twin from dimension B.",
  "The internet was invented by dolphins to distract humans from their ocean takeover."
];

export const ConspiracyFortuneCookiesWidget: React.FC<ConspiracyFortuneCookiesWidgetProps> = ({ widget }) => {
  const [fortune, setFortune] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [crackAnimation, setCrackAnimation] = useState(false);
  const [suspicionLevel, setSuspicionLevel] = useState(0);

  const openCookie = () => {
    setCrackAnimation(true);
    setTimeout(() => {
      const randomFortune = CONSPIRACY_FORTUNES[Math.floor(Math.random() * CONSPIRACY_FORTUNES.length)];
      setFortune(randomFortune);
      setSuspicionLevel(Math.floor(Math.random() * 100) + 1);
      setIsOpen(true);
      setCrackAnimation(false);
    }, 500);
  };

  const resetCookie = () => {
    setIsOpen(false);
    setFortune('');
    setSuspicionLevel(0);
  };

  const getSuspicionColor = () => {
    if (suspicionLevel < 30) return 'text-green-400';
    if (suspicionLevel < 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSuspicionLabel = () => {
    if (suspicionLevel < 30) return 'Mildly Paranoid';
    if (suspicionLevel < 70) return 'Highly Suspicious';
    return 'MAXIMUM PARANOIA';
  };

  return (
    <div className="text-center space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🕵️</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
      </div>
      
      <div className="relative">
        <div 
          className={`text-8xl cursor-pointer transition-transform duration-500 ${
            crackAnimation ? 'animate-bounce' : 'hover:scale-110'
          } ${isOpen ? 'opacity-50' : 'opacity-100'}`}
          onClick={!isOpen ? openCookie : undefined}
        >
          🥠
        </div>
        
        {isOpen && (
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 
                         bg-red-900 border border-red-700 px-4 py-3 rounded-lg max-w-xs
                         animate-fade-in">
            <div className="flex items-start space-x-2">
              <div className="text-red-400 text-lg">⚠️</div>
              <div>
                <p className="text-red-100 text-sm font-mono">"{fortune}"</p>
              </div>
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                           w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-700"></div>
          </div>
        )}
      </div>
      
      {isOpen && (
        <div className="space-y-4">
          <div className="bg-gray-900 p-4 rounded border border-gray-600">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Suspicion Level:</span>
              <span className={`font-mono font-bold ${getSuspicionColor()}`}>
                {suspicionLevel}% {getSuspicionLabel()}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${
                  suspicionLevel < 30 ? 'bg-green-400' : 
                  suspicionLevel < 70 ? 'bg-yellow-400' : 'bg-red-400'
                }`}
                style={{ width: `${suspicionLevel}%` }}
              ></div>
            </div>
          </div>
          
          <button
            onClick={resetCookie}
            className="px-4 py-2 bg-black border border-white text-white font-mono text-sm
                       hover:bg-white hover:text-black transition-all duration-300"
          >
            Get Another Conspiracy
          </button>
        </div>
      )}
      
      {!isOpen && (
        <p className="text-gray-500 text-sm">
          Click the cookie to reveal the truth they don't want you to know
        </p>
      )}
      
      <div className="text-center">
        <p className="text-gray-600 text-xs italic">
          Warning: May cause increased paranoia and an urge to check your surroundings
        </p>
      </div>
    </div>
  );
};