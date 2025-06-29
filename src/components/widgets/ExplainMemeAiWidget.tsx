import React, { useState } from 'react';
import { Widget } from '../../types/reddit';

interface ExplainMemeAiWidgetProps {
  widget: Widget;
}

const ACADEMIC_EXPLANATIONS = [
  "This digital artifact represents the collective unconscious of internet culture, manifesting as a humorous juxtaposition of expectation versus reality in the modern technological landscape.",
  "The memetic structure demonstrates a sophisticated understanding of irony, utilizing visual metaphors to critique contemporary social phenomena through the lens of absurdist humor.",
  "This particular specimen of internet folklore employs recursive self-reference to create a meta-commentary on the nature of digital communication and its impact on human consciousness.",
  "The comedic value derives from the subversion of traditional narrative expectations, creating cognitive dissonance that resolves through laughter as a psychological defense mechanism.",
  "This meme functions as a cultural artifact that encapsulates the zeitgeist of digital natives, expressing complex emotional states through simplified visual language.",
  "The humor emerges from the recognition of shared experiences within the digital community, creating in-group solidarity through the acknowledgment of common struggles.",
  "This represents a form of digital folklore that serves to process collective trauma through the therapeutic mechanism of communal laughter and shared understanding."
];

export const ExplainMemeAiWidget: React.FC<ExplainMemeAiWidgetProps> = ({ widget }) => {
  const [explanation, setExplanation] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const explainMeme = () => {
    setIsAnalyzing(true);
    setExplanation('');
    
    setTimeout(() => {
      const randomExplanation = ACADEMIC_EXPLANATIONS[Math.floor(Math.random() * ACADEMIC_EXPLANATIONS.length)];
      setExplanation(randomExplanation);
      setIsAnalyzing(false);
    }, 3000);
  };

  const reset = () => {
    setExplanation('');
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🎓</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
      </div>
      
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">😂</div>
          <div>
            <h3 className="text-white font-bold mb-2">Subject for Analysis:</h3>
            <p className="text-gray-300 text-lg">
              {widget.data ? widget.data.title : widget.content}
            </p>
            {widget.data && (
              <p className="text-gray-500 text-sm mt-2">
                Source: r/{widget.data.subreddit} • {widget.data.ups} upvotes
              </p>
            )}
          </div>
        </div>
      </div>
      
      <button
        onClick={explainMeme}
        disabled={isAnalyzing}
        className="w-full px-6 py-3 bg-black border-2 border-white text-white font-mono font-bold
                   hover:bg-white hover:text-black transition-all duration-300
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
      >
        {isAnalyzing ? 'CONDUCTING ACADEMIC ANALYSIS...' : 'EXPLAIN THIS MEME, AI!'}
      </button>
      
      {isAnalyzing && (
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-2">
            <div className="animate-pulse text-2xl">📚</div>
            <div className="animate-bounce text-2xl">🤓</div>
            <div className="animate-spin text-2xl">🧠</div>
          </div>
          <p className="text-gray-400 text-sm">
            Applying advanced memetic theory and cultural analysis...
          </p>
        </div>
      )}
      
      {explanation && !isAnalyzing && (
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">🎩</div>
            <div>
              <h3 className="text-white font-bold mb-3">Academic Analysis:</h3>
              <p className="text-gray-300 text-lg leading-relaxed italic">
                "{explanation}"
              </p>
              <div className="mt-6 pt-4 border-t border-gray-700">
                <p className="text-gray-400 text-sm">
                  - Dr. Memesworth, Professor of Digital Anthropology
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  University of Internet Studies, Department of Chaos Theory
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {explanation && (
        <div className="text-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-black border border-white text-white font-mono text-sm
                       hover:bg-white hover:text-black transition-all duration-300"
          >
            Analyze Another Meme
          </button>
        </div>
      )}
    </div>
  );
};