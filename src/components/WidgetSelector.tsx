import React, { useState } from 'react';
import { List, X } from 'lucide-react';
import { generateWidget } from '../utils/widgetGenerator';
import { Widget } from '../types/reddit';

interface WidgetSelectorProps {
  onWidgetSelect: (widget: Widget) => void;
}

const AVAILABLE_WIDGETS = [
  // Featured AI Chatbot at the top
  { type: 'useless-ai-chatbot', title: 'Absolutely Useless AI Chatbot', description: 'Chat with an AI that specializes in being completely unhelpful!' },
  
  // Original widgets
  { type: 'click-counter', title: 'The Absolutely Pointless Click Counter', description: 'Click me and watch numbers go up for no reason whatsoever!' },
  { type: 'spinner', title: 'The Maybe Machine', description: 'Spin to get a definitely maybe answer to life\'s questions!' },
  { type: 'cat-meow', title: 'Digital Cat Simulator', description: 'Hover over me to hear my majestic meow! (Warning: No actual sound)' },
  { type: 'fortune-cookie', title: '404 Fortune Cookie', description: 'Click the cookie for wisdom that doesn\'t exist!' },
  { type: 'reverse-typing', title: 'Reverse Typing Challenge', description: 'Type this phrase backwards. Because why not?' },
  { type: 'useless-stats', title: 'Useless Life Statistics', description: 'Tracking the metrics that absolutely don\'t matter!' },
  { type: 'sandwich-therapist', title: 'AI Therapist for Sandwiches', description: 'What kind of sandwich are you today? Let\'s explore your inner bread.' },
  { type: 'time-travel', title: 'Time Travel Calculator', description: 'Discover which historical era your soul belongs to!' },
  { type: 'meme-translator', title: 'Meme to Formal English Translator', description: 'Converting internet chaos into sophisticated discourse!' },
  { type: 'ai-spirit-animal', title: 'AI Spirit Animal Generator', description: 'Rate your current energy level and discover your inner chaos creature!' },
  { type: 'reddit-meme-zodiac', title: 'Reddit Meme Zodiac', description: 'Choose your vibe and receive your daily meme horoscope!' },
  { type: 'explain-meme-ai', title: 'Explain This Meme, AI!', description: 'Academic analysis of internet chaos for your intellectual pleasure.' },
  { type: 'mini-reddit-reels', title: 'Mini Reddit Reels Player', description: 'Vertical drama simulator - because we need more chaos in our lives!' },
  { type: 'conspiracy-generator', title: 'Daily Random Conspiracy Generator', description: 'Fresh conspiracies delivered straight to your brain!' },
  { type: 'chaotic-comment-theater', title: 'Chaotic Comment Theater', description: 'Watch strangers argue about meaningless topics!' },
  { type: 'meme-spirit-weapon', title: 'Your Meme Spirit Weapon', description: 'Choose your battle mood and receive your weapon of mass confusion!' },
  { type: 'floating-bubble', title: 'Floating Thought Bubble', description: 'Watch the thought bubble float around. Click to pop it!' },
  
  // Working new widgets
  { type: 'emotional-cheese-grater', title: 'Emotional Cheese Grater', description: 'Grate your feelings into tiny, manageable pieces!' },
  { type: 'ai-therapist-roaster', title: 'AI Therapist That Roasts You', description: 'Get therapy, but make it savage. Your problems deserve better insults.' },
  { type: 'interdimensional-todo', title: 'Interdimensional To-Do List', description: 'Tasks from parallel universes where you\'re more productive!' },
  { type: 'out-of-context-quotes', title: 'Out-of-Context Movie Quote Generator', description: 'Famous movie lines that make no sense here!' },
  { type: 'sarcastic-dictionary', title: 'The Sarcastic Dictionary', description: 'Word definitions, but with maximum attitude!' },
  { type: 'time-traveler-diary', title: 'Time Traveler\'s Mood Diary', description: 'Emotional entries from across the timeline!' },
  { type: 'wrong-historical-events', title: 'Random Historical Event, But Wrong', description: 'History lessons from an alternate reality!' },
  { type: 'haunted-calculator', title: 'Haunted Calculator', description: 'Math, but cursed. The numbers don\'t add up... literally!' },
  { type: 'pet-rock-mood', title: 'The Pet Rock\'s Daily Mood', description: 'Your rock has feelings. Deep, geological feelings.' },
  { type: 'ai-dreams', title: 'Totally Real AI Dreams', description: 'What artificial intelligence dreams about when it sleeps!' },
  { type: 'internet-apology-generator', title: 'Random Internet Apology Generator', description: 'Sorry for things you didn\'t even know you did wrong!' },
  { type: 'is-it-toasted', title: '"Is It Toasted?" Widget', description: 'Evaluating random objects for their toastiness level!' },
  { type: 'emotion-number-generator', title: 'Emotion-Driven Random Number Generator', description: 'Numbers based on your current emotional state!' },
  { type: 'potato-destiny', title: 'Potato of Destiny', description: 'Click the sacred potato to learn your starchy fate!' },
  { type: 'dramatic-recipe', title: 'Overly Dramatic Recipe Widget', description: 'Cooking instructions with unnecessary emotional intensity!' },
  { type: 'broccoli-life-coach', title: 'Broccoli Life Coach', description: 'Nutritional wisdom meets questionable life advice!' },
  { type: 'honest-mirror', title: 'Alarmingly Honest Mirror Widget', description: 'Reflections that tell you what you need to hear!' },
  { type: 'pigeon-sandwich-rater', title: 'Pigeon That Rates Sandwiches', description: 'Professional sandwich criticism from a bird brain!' },
  { type: 'life-achievement-unlocked', title: 'Random Life Achievement Unlocked!', description: 'Celebrating your most mundane accomplishments!' }
];

export const WidgetSelector: React.FC<WidgetSelectorProps> = ({ onWidgetSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleWidgetSelect = (widgetType: string) => {
    const widgetInfo = AVAILABLE_WIDGETS.find(w => w.type === widgetType);
    if (widgetInfo) {
      const widget: Widget = {
        id: Math.random().toString(36).substr(2, 9),
        type: widgetInfo.type as any,
        title: widgetInfo.title,
        content: widgetInfo.description
      };
      onWidgetSelect(widget);
      setIsOpen(false);
    }
  };

  const isSpecialWidget = (widgetType: string) => {
    return widgetType === 'useless-ai-chatbot';
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="group px-8 py-4 bg-black border-2 border-white text-white font-mono font-bold text-lg
                   hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105
                   active:scale-95 flex items-center space-x-3"
      >
        <List className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
        <span>CHOOSE WIDGET</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-black border-2 border-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-white font-mono font-bold text-2xl">Choose Your Widget</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Widget Grid */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AVAILABLE_WIDGETS.map((widget) => (
              <button
                key={widget.type}
                onClick={() => handleWidgetSelect(widget.type)}
                className={`p-4 rounded-lg text-left transition-all duration-300 transform hover:scale-105 active:scale-95 relative ${
                  isSpecialWidget(widget.type)
                    ? 'bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-400 border-2 border-yellow-300 text-black shadow-lg shadow-yellow-500/50'
                    : 'bg-gray-900 border border-gray-700 hover:border-white hover:bg-gray-800'
                }`}
              >
                {isSpecialWidget(widget.type) && (
                  <>
                    {/* Golden sparkle effects */}
                    <div className="absolute -top-1 -right-1 text-yellow-300 text-lg animate-pulse">✨</div>
                    <div className="absolute -bottom-1 -left-1 text-yellow-300 text-lg animate-pulse" style={{ animationDelay: '0.5s' }}>⭐</div>
                    <div className="absolute top-1/2 -right-1 text-yellow-300 text-sm animate-pulse" style={{ animationDelay: '1s' }}>💫</div>
                    
                    {/* Featured badge */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full border border-yellow-300">
                      🤖 FEATURED
                    </div>
                  </>
                )}
                
                <h3 className={`font-bold text-sm mb-2 line-clamp-2 ${
                  isSpecialWidget(widget.type) ? 'text-black' : 'text-white'
                }`}>
                  {widget.title}
                </h3>
                <p className={`text-xs leading-relaxed line-clamp-3 ${
                  isSpecialWidget(widget.type) ? 'text-gray-800' : 'text-gray-400'
                }`}>
                  {widget.description}
                </p>
                
                {isSpecialWidget(widget.type) && (
                  <div className="mt-2 text-xs font-bold text-yellow-800 bg-yellow-200 px-2 py-1 rounded">
                    🔥 NEW AI POWERED
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-700 text-center">
          <p className="text-gray-500 text-sm">
            {AVAILABLE_WIDGETS.length} widgets of pure digital chaos available
          </p>
          <p className="text-yellow-400 text-xs mt-1 font-bold">
            ✨ Featured: AI-Powered Useless Chatbot - Now with Real Artificial Unintelligence!
          </p>
        </div>
      </div>
    </div>
  );
};