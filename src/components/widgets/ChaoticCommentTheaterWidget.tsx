import React, { useState } from 'react';
import { Widget } from '../../types/reddit';
import { COMMENT_ARGUMENTS } from '../../utils/widgetGenerator';

interface ChaoticCommentTheaterWidgetProps {
  widget: Widget;
}

export const ChaoticCommentTheaterWidget: React.FC<ChaoticCommentTheaterWidgetProps> = ({ widget }) => {
  const [currentArgument, setCurrentArgument] = useState(0);
  const [isWatching, setIsWatching] = useState(false);
  const [currentComment, setCurrentComment] = useState(0);
  const [audienceReaction, setAudienceReaction] = useState('');

  const commentArguments = COMMENT_ARGUMENTS;

  const watchArgument = () => {
    setIsWatching(true);
    setCurrentComment(0);
    setAudienceReaction('');
    
    const showComments = () => {
      if (currentComment < commentArguments[currentArgument].comments.length) {
        setTimeout(() => {
          setCurrentComment(prev => prev + 1);
          showComments();
        }, 2000);
      } else {
        // Show final audience reaction
        setTimeout(() => {
          const reactions = ['😂😂😂', '💀💀💀', '🤡🤡🤡', '🍿🍿🍿', '😭😭😭'];
          setAudienceReaction(reactions[Math.floor(Math.random() * reactions.length)]);
        }, 1000);
      }
    };
    
    showComments();
  };

  const nextArgument = () => {
    setCurrentArgument((prev) => (prev + 1) % commentArguments.length);
    setIsWatching(false);
    setCurrentComment(0);
    setAudienceReaction('');
  };

  const reset = () => {
    setIsWatching(false);
    setCurrentComment(0);
    setAudienceReaction('');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🎭</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
      </div>
      
      {/* Theater Stage */}
      <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
        <div className="text-center mb-4">
          <h3 className="text-white font-bold text-xl">
            🎪 Tonight's Drama: {commentArguments[currentArgument].topic}
          </h3>
          <div className="w-16 h-px bg-white mx-auto mt-2"></div>
        </div>
        
        {/* Stage */}
        <div className="bg-black rounded p-4 min-h-[200px] relative">
          {!isWatching ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🎬</div>
              <p className="text-gray-400">The stage is set for chaos...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {commentArguments[currentArgument].comments.slice(0, currentComment).map((comment, index) => (
                <div key={index} className="animate-fade-in">
                  <div className="flex items-start space-x-3 p-3 bg-gray-800 rounded">
                    <div className="text-xl">{comment.reactions}</div>
                    <div>
                      <p className="text-blue-400 font-mono text-sm">u/{comment.user}</p>
                      <p className="text-gray-200">{comment.text}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {audienceReaction && (
                <div className="text-center py-4 animate-bounce">
                  <div className="text-4xl">{audienceReaction}</div>
                  <p className="text-gray-400 text-sm mt-2">*audience loses their minds*</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Audience */}
        <div className="text-center mt-4">
          <div className="text-2xl space-x-1">
            <span className="animate-bounce">🍿</span>
            <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>👀</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🍿</span>
            <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>👀</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🍿</span>
          </div>
          <p className="text-gray-500 text-xs mt-1">Live audience reaction</p>
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex justify-center space-x-4">
        {!isWatching ? (
          <button
            onClick={watchArgument}
            className="px-6 py-3 bg-black border-2 border-white text-white font-mono font-bold
                       hover:bg-white hover:text-black transition-all duration-300"
          >
            🎬 WATCH THE CHAOS
          </button>
        ) : (
          <button
            onClick={reset}
            className="px-6 py-3 bg-black border-2 border-white text-white font-mono font-bold
                       hover:bg-white hover:text-black transition-all duration-300"
          >
            🛑 STOP THE MADNESS
          </button>
        )}
        
        <button
          onClick={nextArgument}
          className="px-4 py-3 bg-gray-800 border border-gray-600 text-gray-300 font-mono
                     hover:border-white hover:text-white transition-all duration-300"
        >
          Next Drama →
        </button>
      </div>
      
      <div className="text-center">
        <p className="text-gray-500 text-xs">
          Drama {currentArgument + 1} of {commentArguments.length} • No actual Redditors were harmed
        </p>
      </div>
    </div>
  );
};