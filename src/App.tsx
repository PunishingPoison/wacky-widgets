import React, { useState, useEffect } from 'react';
import { WidgetContainer } from './components/WidgetContainer';
import { ShuffleButton } from './components/ShuffleButton';
import { WidgetSelector } from './components/WidgetSelector';
import { useRedditData } from './hooks/useRedditData';
import { generateWidget } from './utils/widgetGenerator';
import { Widget } from './types/reddit';
import { Github, Zap } from 'lucide-react';

function App() {
  const [currentWidget, setCurrentWidget] = useState<Widget | null>(null);
  const [shuffleCount, setShuffleCount] = useState(0);
  const [widgetsViewed, setWidgetsViewed] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { fetchRandomPost, loading } = useRedditData();

  const shuffleWidget = async () => {
    setIsTransitioning(true);
    setShuffleCount(prev => {
      const newCount = prev + 1;
      localStorage.setItem('wackyWidgets_shuffleCount', newCount.toString());
      return newCount;
    });

    try {
      const post = await fetchRandomPost();
      const widget = generateWidget(post);
      
      // Add a small delay for smooth transition
      setTimeout(() => {
        setCurrentWidget(widget);
        setWidgetsViewed(prev => {
          const newCount = prev + 1;
          localStorage.setItem('wackyWidgets_widgetsViewed', newCount.toString());
          return newCount;
        });
        setIsTransitioning(false);
      }, 300);
    } catch (error) {
      // Fallback to standalone widget if Reddit fetch fails
      const widget = generateWidget(null);
      setTimeout(() => {
        setCurrentWidget(widget);
        setWidgetsViewed(prev => {
          const newCount = prev + 1;
          localStorage.setItem('wackyWidgets_widgetsViewed', newCount.toString());
          return newCount;
        });
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleWidgetSelect = (widget: Widget) => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentWidget(widget);
      setWidgetsViewed(prev => {
        const newCount = prev + 1;
        localStorage.setItem('wackyWidgets_widgetsViewed', newCount.toString());
        return newCount;
      });
      setIsTransitioning(false);
    }, 300);
  };

  // Initialize with a widget on first load
  useEffect(() => {
    const savedShuffleCount = localStorage.getItem('wackyWidgets_shuffleCount');
    const savedWidgetsViewed = localStorage.getItem('wackyWidgets_widgetsViewed');
    
    if (savedShuffleCount) {
      setShuffleCount(parseInt(savedShuffleCount, 10));
    }
    if (savedWidgetsViewed) {
      setWidgetsViewed(parseInt(savedWidgetsViewed, 10));
    }
    
    shuffleWidget();
    
    // Enhanced console Easter eggs
    console.log('%c🎲 Welcome to WackyWidgets Extended! 🎲', 'color: #fff; background: #000; padding: 10px; font-size: 16px; font-weight: bold;');
    console.log('%cTry shuffling widgets to unlock hidden messages!', 'color: #888; font-style: italic;');
    console.log('%cEaster egg locations: 100 clicks, 50 shuffles, 25 widgets viewed', 'color: #666; font-size: 12px;');
    console.log('%c🎭 New chaos widgets added: 20+ new ways to waste your time!', 'color: #0ff; background: #000; padding: 5px;');
    
    // Special console messages based on usage
    if (shuffleCount >= 50) {
      console.log('%c🏆 SHUFFLE MASTER DETECTED! You\'ve shuffled 50+ times!', 'color: #gold; background: #000; padding: 5px;');
    }
    if (widgetsViewed >= 25) {
      console.log('%c🎯 WIDGET CONNOISSEUR! You\'ve viewed 25+ widgets!', 'color: #cyan; background: #000; padding: 5px;');
    }
  }, []);

  // Additional Easter eggs based on usage
  useEffect(() => {
    if (shuffleCount === 50) {
      console.log('%c🎉 CONGRATULATIONS! You\'ve reached 50 shuffles! You are officially addicted to pointless widgets!', 'color: #ff0; background: #000; padding: 10px; font-weight: bold;');
    }
    if (widgetsViewed === 25) {
      console.log('%c🌟 WIDGET MASTER! 25 widgets viewed! Your dedication to digital absurdity is admirable!', 'color: #0f0; background: #000; padding: 10px; font-weight: bold;');
    }
    if (shuffleCount === 100) {
      console.log('%c🚀 ULTIMATE CHAOS ACHIEVED! 100 shuffles! You have transcended normal human behavior!', 'color: #f0f; background: #000; padding: 15px; font-weight: bold; font-size: 18px;');
    }
  }, [shuffleCount, widgetsViewed]);

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <header className="text-center py-12 px-4">
        <h1 className="text-6xl font-bold mb-4 tracking-tight">
          WackyWidgets
          <span className="text-2xl text-gray-500 ml-2">Extended</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          The internet's most gloriously pointless playground
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Now with 36 new ways to question your life choices
        </p>
        <div className="w-24 h-px bg-white mx-auto mt-6"></div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Widget Display */}
          {currentWidget && (
            <div className={`transition-all duration-500 ${
              isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
            }`}>
              <WidgetContainer 
                widget={currentWidget} 
                isLoading={isTransitioning || loading} 
              />
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex justify-center space-x-4">
            <ShuffleButton 
              onShuffle={shuffleWidget} 
              isLoading={isTransitioning || loading} 
            />
            <WidgetSelector onWidgetSelect={handleWidgetSelect} />
          </div>

          {/* Enhanced Stats */}
          {(shuffleCount > 0 || widgetsViewed > 0) && (
            <div className="text-center space-y-2">
              <div className="flex justify-center space-x-8 text-sm">
                <div className="text-gray-600">
                  <span className="text-white font-mono">{shuffleCount}</span> shuffles
                </div>
                <div className="text-gray-600">
                  <span className="text-white font-mono">{widgetsViewed}</span> widgets viewed
                </div>
              </div>
              {shuffleCount >= 10 && (
                <p className="text-gray-700 text-xs">
                  Your productivity has decreased by approximately {(shuffleCount * 0.3).toFixed(1)}%
                </p>
              )}
              {shuffleCount >= 25 && (
                <p className="text-gray-700 text-xs">
                  Chaos level: {Math.min(100, shuffleCount * 2)}% • Sanity remaining: {Math.max(0, 100 - shuffleCount)}%
                </p>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="border-t border-gray-800 py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex justify-center items-center space-x-6">
            <a 
              href="https://github.com/PunishingPoison/wacky-widgets" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <div className="w-px h-4 bg-gray-700"></div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Zap className="w-5 h-5" />
              <span>Built with Bolt</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-gray-600 text-xs">
              Powered by Reddit's finest chaos • Made with ❤️ and questionable decisions
            </p>
            <p className="text-gray-700 text-xs">
              Extended Edition: Now with 36 ways to waste your time
            </p>
            <p className="text-gray-700 text-xs">
              🎭 New: 20 chaotic widgets including Emotional Cheese Graters, AI Roasters & More!
            </p>
            <p className="text-gray-600 text-xs mt-3 border-t border-gray-800 pt-3">
              Made by V C Mohit Rao
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;