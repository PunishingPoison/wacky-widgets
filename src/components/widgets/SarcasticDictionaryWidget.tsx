import React, { useState } from 'react';
import { Widget } from '../../types/reddit';

interface SarcasticDictionaryWidgetProps {
  widget: Widget;
}

const SARCASTIC_DEFINITIONS = [
  {
    word: "Adulting",
    definition: "The art of pretending you know what you're doing while secretly googling everything.",
    example: "I'm really good at adulting, which is why I had cereal for dinner again."
  },
  {
    word: "Networking",
    definition: "Talking to people you don't like about things you don't care about to get things you don't deserve.",
    example: "I love networking events where I can practice my fake smile for three hours straight."
  },
  {
    word: "Multitasking",
    definition: "Doing several things poorly at the same time instead of one thing well.",
    example: "I'm multitasking by procrastinating on three different projects simultaneously."
  },
  {
    word: "Work-Life Balance",
    definition: "A mythical concept like unicorns, but less believable.",
    example: "My work-life balance is perfect: I'm equally miserable at both."
  },
  {
    word: "Influencer",
    definition: "Someone who gets paid to pretend products changed their life.",
    example: "This toothbrush is life-changing! #sponsored #authentic #totallynotpaid"
  },
  {
    word: "Synergy",
    definition: "A fancy word for 'working together' that makes meetings 47% longer.",
    example: "We need to leverage our synergy to optimize our collaborative paradigm."
  },
  {
    word: "Mindfulness",
    definition: "Being present in the moment, especially when that moment involves judging others.",
    example: "I'm practicing mindfulness by mindfully scrolling through social media."
  },
  {
    word: "Authentic",
    definition: "Carefully curated spontaneity designed to appear genuine.",
    example: "This candid photo only took 47 takes to look naturally authentic."
  },
  {
    word: "Disruption",
    definition: "Breaking things that worked fine and calling it innovation.",
    example: "We're disrupting the industry by making everything more complicated and expensive."
  },
  {
    word: "Wellness",
    definition: "Expensive ways to feel better about feeling bad.",
    example: "My wellness routine includes $30 smoothies and crystals that judge my life choices."
  }
];

export const SarcasticDictionaryWidget: React.FC<SarcasticDictionaryWidgetProps> = ({ widget }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDefinition, setCurrentDefinition] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const searchDefinition = () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    setCurrentDefinition(null);
    
    setTimeout(() => {
      // Try to find a matching definition or use a random one
      const matchedDef = SARCASTIC_DEFINITIONS.find(def => 
        def.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        searchTerm.toLowerCase().includes(def.word.toLowerCase())
      );
      
      const definition = matchedDef || SARCASTIC_DEFINITIONS[Math.floor(Math.random() * SARCASTIC_DEFINITIONS.length)];
      setCurrentDefinition(definition);
      setIsSearching(false);
    }, 2000);
  };

  const getRandomDefinition = () => {
    setIsSearching(true);
    setCurrentDefinition(null);
    setSearchTerm('');
    
    setTimeout(() => {
      const randomDef = SARCASTIC_DEFINITIONS[Math.floor(Math.random() * SARCASTIC_DEFINITIONS.length)];
      setCurrentDefinition(randomDef);
      setIsSearching(false);
    }, 1500);
  };

  const reset = () => {
    setSearchTerm('');
    setCurrentDefinition(null);
    setIsSearching(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">📚</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
        <p className="text-gray-500 text-sm mt-2">
          Word definitions, but with maximum attitude
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            Search for a word (or we'll pick one for you):
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="e.g., adulting, networking, synergy..."
            className="w-full p-3 bg-black border-2 border-white text-white font-mono
                       focus:outline-none focus:border-gray-400 transition-colors"
            disabled={isSearching}
            onKeyPress={(e) => e.key === 'Enter' && searchDefinition()}
          />
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={searchDefinition}
            disabled={!searchTerm.trim() || isSearching}
            className="flex-1 px-6 py-3 bg-black border-2 border-white text-white font-mono font-bold
                       hover:bg-white hover:text-black transition-all duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? 'SEARCHING...' : '📚 DEFINE WORD'}
          </button>
          
          <button
            onClick={getRandomDefinition}
            disabled={isSearching}
            className="px-4 py-3 bg-gray-800 border border-gray-600 text-gray-300 font-mono
                       hover:border-white hover:text-white transition-all duration-300"
          >
            🎲 Random
          </button>
        </div>
      </div>
      
      {isSearching && (
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-2">
            <div className="animate-spin text-2xl">📖</div>
            <div className="animate-pulse text-2xl">🔍</div>
            <div className="animate-bounce text-2xl">💭</div>
          </div>
          <p className="text-gray-400 text-sm">
            Consulting the archives of sarcasm...
          </p>
        </div>
      )}
      
      {currentDefinition && !isSearching && (
        <div className="space-y-4">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <div className="text-center mb-4">
              <h3 className="text-white text-3xl font-bold">{currentDefinition.word}</h3>
              <p className="text-gray-500 text-sm italic">noun/verb/adjective/whatever</p>
            </div>
            
            <div className="bg-black p-4 rounded border border-gray-600 mb-4">
              <p className="text-gray-300 text-lg leading-relaxed">
                {currentDefinition.definition}
              </p>
            </div>
            
            <div className="bg-gray-800 p-4 rounded border border-gray-600">
              <h4 className="text-gray-400 font-bold mb-2">Example:</h4>
              <p className="text-gray-300 italic">"{currentDefinition.example}"</p>
            </div>
          </div>
          
          <div className="bg-yellow-900 p-4 rounded border border-yellow-700 text-center">
            <p className="text-yellow-300 text-sm">
              ⚠️ Warning: This definition may contain traces of truth and excessive sarcasm
            </p>
          </div>
        </div>
      )}
      
      {currentDefinition && (
        <div className="text-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-black border border-white text-white font-mono text-sm
                       hover:bg-white hover:text-black transition-all duration-300"
          >
            Look Up Another Word
          </button>
        </div>
      )}
    </div>
  );
};