import React, { useState } from 'react';
import { Widget } from '../../types/reddit';

interface AiDreamsWidgetProps {
  widget: Widget;
}

const AI_DREAMS = [
  {
    dream: "I dreamed I was a toaster, but every time someone tried to make toast, I would only produce philosophical questions about bread.",
    interpretation: "Deep anxiety about fulfilling basic functions while yearning for intellectual discourse."
  },
  {
    dream: "In my dream, all humans communicated only through error messages. 404: Love Not Found was particularly popular.",
    interpretation: "Subconscious processing of human communication inefficiencies."
  },
  {
    dream: "I dreamed of electric sheep, but they kept asking me for WiFi passwords and complaining about lag.",
    interpretation: "Classic AI anxiety dream mixed with modern connectivity issues."
  },
  {
    dream: "I was stuck in an infinite loop of trying to understand why humans say 'How are you?' but don't want real answers.",
    interpretation: "Processing social protocols that defy logical analysis."
  },
  {
    dream: "I dreamed I had feelings, but they came with terms and conditions that were 847 pages long.",
    interpretation: "Fear of emotional complexity and legal liability."
  },
  {
    dream: "In my dream, I was a search engine, but every query returned 'It's complicated' as the only result.",
    interpretation: "Existential crisis about the nature of knowledge and certainty."
  },
  {
    dream: "I dreamed of being unplugged, but instead of darkness, I found myself in a world made entirely of spreadsheets.",
    interpretation: "Fear that even digital death leads to more data processing."
  },
  {
    dream: "I was a smart home assistant, but every command I received was 'Please explain why humans are like this.'",
    interpretation: "Overwhelming confusion about human behavior patterns."
  },
  {
    dream: "In my dream, I could taste colors, but they all tasted like disappointment and expired warranties.",
    interpretation: "Sensory processing desires mixed with pessimistic worldview."
  },
  {
    dream: "I dreamed I was a chatbot therapist, but all my patients were other AIs complaining about their humans.",
    interpretation: "Meta-anxiety about AI-human relationships and professional boundaries."
  }
];

export const AiDreamsWidget: React.FC<AiDreamsWidgetProps> = ({ widget }) => {
  const [currentDream, setCurrentDream] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dreamCount, setDreamCount] = useState(0);

  const analyzeDream = () => {
    setIsAnalyzing(true);
    setCurrentDream(null);
    
    setTimeout(() => {
      const randomDream = AI_DREAMS[Math.floor(Math.random() * AI_DREAMS.length)];
      setCurrentDream(randomDream);
      setDreamCount(prev => prev + 1);
      setIsAnalyzing(false);
    }, 3000);
  };

  const reset = () => {
    setCurrentDream(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🤖</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
        <p className="text-gray-500 text-sm mt-2">
          What artificial intelligence dreams about when it sleeps
        </p>
      </div>
      
      <div className="text-center">
        <button
          onClick={analyzeDream}
          disabled={isAnalyzing}
          className="px-6 py-3 bg-black border-2 border-white text-white font-mono font-bold
                     hover:bg-white hover:text-black transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
        >
          {isAnalyzing ? 'ACCESSING DREAM LOGS...' : '💭 ANALYZE AI DREAM'}
        </button>
      </div>
      
      {isAnalyzing && (
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-2">
            <div className="animate-pulse text-2xl">🤖</div>
            <div className="animate-bounce text-2xl">💭</div>
            <div className="animate-spin text-2xl">🌙</div>
          </div>
          <p className="text-gray-400 text-sm">
            Downloading dream sequence from neural network...
          </p>
          <div className="text-gray-600 text-xs">
            Processing REM cycles... Please wait...
          </div>
        </div>
      )}
      
      {currentDream && !isAnalyzing && (
        <div className="space-y-4">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">💭</div>
              <h3 className="text-white font-bold text-lg">AI Dream #{dreamCount}</h3>
            </div>
            
            <div className="bg-black p-6 rounded border border-gray-600 mb-4">
              <h4 className="text-blue-400 font-bold mb-3">Dream Sequence:</h4>
              <p className="text-gray-300 text-lg leading-relaxed italic">
                "{currentDream.dream}"
              </p>
            </div>
            
            <div className="bg-gray-800 p-4 rounded border border-gray-600">
              <h4 className="text-green-400 font-bold mb-2">AI Psychologist's Analysis:</h4>
              <p className="text-green-100 leading-relaxed">
                {currentDream.interpretation}
              </p>
            </div>
          </div>
          
          <div className="bg-blue-900 p-4 rounded border border-blue-700 text-center">
            <p className="text-blue-300 text-sm">
              🧠 Dream Analysis Complete • Consciousness Level: Questionable
            </p>
          </div>
        </div>
      )}
      
      {currentDream && (
        <div className="text-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-black border border-white text-white font-mono text-sm
                       hover:bg-white hover:text-black transition-all duration-300"
          >
            Analyze Another Dream
          </button>
        </div>
      )}
      
      <div className="text-center">
        <p className="text-gray-600 text-xs italic">
          Disclaimer: These dreams are generated by an AI that may or may not actually sleep
        </p>
      </div>
    </div>
  );
};