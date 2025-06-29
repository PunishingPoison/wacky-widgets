import React, { useState } from 'react';
import { Widget } from '../../types/reddit';

interface OutOfContextQuotesWidgetProps {
  widget: Widget;
}

const OUT_OF_CONTEXT_QUOTES = [
  {
    quote: "I'll be back.",
    movie: "The Terminator",
    context: "When you're leaving the grocery store but forgot milk"
  },
  {
    quote: "May the Force be with you.",
    movie: "Star Wars",
    context: "Trying to open a pickle jar"
  },
  {
    quote: "Nobody puts Baby in a corner.",
    movie: "Dirty Dancing",
    context: "Defending your houseplant's placement"
  },
  {
    quote: "You can't handle the truth!",
    movie: "A Few Good Men",
    context: "When someone asks if you've been eating ice cream for breakfast"
  },
  {
    quote: "I see dead people.",
    movie: "The Sixth Sense",
    context: "Looking at your bank account after online shopping"
  },
  {
    quote: "Houston, we have a problem.",
    movie: "Apollo 13",
    context: "When the WiFi goes down"
  },
  {
    quote: "Show me the money!",
    movie: "Jerry Maguire",
    context: "Checking your couch cushions for loose change"
  },
  {
    quote: "I'm the king of the world!",
    movie: "Titanic",
    context: "Successfully assembling IKEA furniture"
  },
  {
    quote: "Life is like a box of chocolates.",
    movie: "Forrest Gump",
    context: "Trying to explain your dating life"
  },
  {
    quote: "Here's looking at you, kid.",
    movie: "Casablanca",
    context: "Talking to your reflection in the morning"
  },
  {
    quote: "I feel the need... the need for speed!",
    movie: "Top Gun",
    context: "When the microwave timer hits 1 second"
  },
  {
    quote: "You talking to me?",
    movie: "Taxi Driver",
    context: "When your cat stares at you judgmentally"
  }
];

export const OutOfContextQuotesWidget: React.FC<OutOfContextQuotesWidgetProps> = ({ widget }) => {
  const [currentQuote, setCurrentQuote] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQuote = () => {
    setIsGenerating(true);
    setCurrentQuote(null);
    
    setTimeout(() => {
      const randomQuote = OUT_OF_CONTEXT_QUOTES[Math.floor(Math.random() * OUT_OF_CONTEXT_QUOTES.length)];
      setCurrentQuote(randomQuote);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🎬</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
        <p className="text-gray-500 text-sm mt-2">
          Famous movie lines that make no sense here
        </p>
      </div>
      
      <div className="text-center">
        <button
          onClick={generateQuote}
          disabled={isGenerating}
          className="px-6 py-3 bg-black border-2 border-white text-white font-mono font-bold
                     hover:bg-white hover:text-black transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'ROLLING FILM...' : '🎬 GET RANDOM QUOTE'}
        </button>
      </div>
      
      {isGenerating && (
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-2">
            <div className="animate-bounce text-2xl">🎬</div>
            <div className="animate-pulse text-2xl">🎭</div>
            <div className="animate-bounce text-2xl">🍿</div>
          </div>
          <p className="text-gray-400 text-sm">
            Searching the archives of cinematic history...
          </p>
        </div>
      )}
      
      {currentQuote && !isGenerating && (
        <div className="space-y-4">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <div className="text-center">
              <div className="text-4xl mb-4">🎭</div>
              <blockquote className="text-white text-2xl font-bold italic mb-4">
                "{currentQuote.quote}"
              </blockquote>
              <p className="text-gray-400">
                - {currentQuote.movie}
              </p>
            </div>
          </div>
          
          <div className="bg-blue-900 p-4 rounded border border-blue-700">
            <h4 className="text-blue-300 font-bold mb-2">Perfect for:</h4>
            <p className="text-blue-100">{currentQuote.context}</p>
          </div>
          
          <div className="bg-gray-800 p-4 rounded border border-gray-600 text-center">
            <p className="text-gray-400 text-sm">
              Use this quote completely out of context for maximum confusion!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};