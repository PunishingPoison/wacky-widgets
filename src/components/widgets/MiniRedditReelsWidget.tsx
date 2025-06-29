import React, { useState, useEffect } from 'react';
import { Widget } from '../../types/reddit';
import { REDDIT_DRAMA_CLIPS } from '../../utils/widgetGenerator';

interface MiniRedditReelsWidgetProps {
  widget: Widget;
}

export const MiniRedditReelsWidget: React.FC<MiniRedditReelsWidgetProps> = ({ widget }) => {
  const [currentClip, setCurrentClip] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [showText, setShowText] = useState('');
  const [textIndex, setTextIndex] = useState(0);

  const clips = REDDIT_DRAMA_CLIPS;

  useEffect(() => {
    if (isPlaying && textIndex < clips[currentClip].drama.length) {
      const timer = setTimeout(() => {
        setShowText(clips[currentClip].drama.slice(0, textIndex + 1));
        setTextIndex(textIndex + 1);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, textIndex, currentClip]);

  const playClip = () => {
    setIsPlaying(true);
    setShowText('');
    setTextIndex(0);
    setLikes(Math.floor(Math.random() * 1000) + 100);
    setHasLiked(false);
  };

  const nextClip = () => {
    setCurrentClip((prev) => (prev + 1) % clips.length);
    setIsPlaying(false);
    setShowText('');
    setTextIndex(0);
  };

  const toggleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    }
  };

  const reportNonsense = () => {
    alert("Thank you for reporting this nonsense. We'll add it to our collection of quality content. 🚩");
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-4xl mb-2">📱</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
      </div>
      
      {/* Fake Phone Frame */}
      <div className="max-w-sm mx-auto bg-gray-900 rounded-3xl p-4 border-2 border-gray-700">
        {/* Video Area */}
        <div className="bg-black rounded-2xl p-6 min-h-[300px] flex flex-col justify-between">
          {/* Title */}
          <div className="text-center">
            <h3 className="text-white font-bold text-lg mb-2">
              {clips[currentClip].title}
            </h3>
          </div>
          
          {/* Drama Text */}
          <div className="flex-1 flex items-center justify-center">
            {!isPlaying ? (
              <button
                onClick={playClip}
                className="text-6xl hover:scale-110 transition-transform duration-300"
              >
                ▶️
              </button>
            ) : (
              <div className="text-center">
                <p className="text-white text-lg font-mono leading-relaxed">
                  {showText}
                  {textIndex < clips[currentClip].drama.length && (
                    <span className="animate-pulse">|</span>
                  )}
                </p>
              </div>
            )}
          </div>
          
          {/* Reactions */}
          {isPlaying && textIndex >= clips[currentClip].drama.length && (
            <div className="flex justify-center space-x-2 mt-4">
              {clips[currentClip].reactions.map((reaction, index) => (
                <span key={index} className="text-2xl animate-bounce" 
                      style={{ animationDelay: `${index * 0.1}s` }}>
                  {reaction}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Controls */}
        <div className="flex justify-between items-center mt-4 px-2">
          <button
            onClick={toggleLike}
            className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-all duration-300 ${
              hasLiked ? 'bg-red-900 text-red-300' : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <span className="text-xl">❤️</span>
            <span className="font-mono text-sm">{likes}</span>
          </button>
          
          <button
            onClick={reportNonsense}
            className="flex items-center space-x-1 px-3 py-2 bg-gray-800 text-gray-400 rounded-full
                       hover:text-white transition-colors duration-300"
          >
            <span className="text-xl">🚩</span>
            <span className="font-mono text-sm">Report</span>
          </button>
          
          <button
            onClick={nextClip}
            className="px-4 py-2 bg-white text-black font-mono font-bold rounded-full
                       hover:bg-gray-200 transition-colors duration-300"
          >
            Next
          </button>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-gray-500 text-xs">
          Clip {currentClip + 1} of {clips.length} • Swipe up for more chaos
        </p>
      </div>
    </div>
  );
};