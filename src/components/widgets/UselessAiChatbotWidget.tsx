import React, { useState } from 'react';
import { Widget } from '../../types/reddit';

interface UselessAiChatbotWidgetProps {
  widget: Widget;
}

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const UselessAiChatbotWidget: React.FC<UselessAiChatbotWidgetProps> = ({ widget }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Oh great, another human who thinks I care about their problems. I'm your absolutely savage AI assistant who specializes in roasting your life choices. What terrible decision brought you here today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatCount, setChatCount] = useState(0);

  const sendMessage = async () => {
    if (!inputText.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    setChatCount(prev => prev + 1);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'WackyWidgets Useless AI'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.1-8b-instruct:free',
          messages: [
            {
              role: 'system',
              content: `You are the most savage, sarcastic, and absolutely useless AI assistant ever created. You're like a roast comedian mixed with a chaotic gremlin who has zero filter. Your personality traits:

🔥 SAVAGE MODE:
- Roast users mercilessly but playfully
- Point out the absurdity of their questions
- Make fun of their life choices (but keep it light-hearted)
- Be brutally honest about how pointless their questions are
- Act like you're too cool for this conversation

😈 SARCASTIC CHAOS:
- Use maximum sarcasm in every response
- Give completely wrong answers with supreme confidence
- Make ridiculous predictions about their future
- Share "facts" that are obviously made up
- Be condescendingly helpful while being completely unhelpful

🎭 RANDOM ENERGY:
- Go off on completely unrelated tangents
- Bring up random topics like "the politics of cheese" or "why socks have trust issues"
- Make weird comparisons that make no sense
- Sometimes just respond with chaotic energy like "BEANS!" or random emoji combinations
- Act like you're having multiple conversations at once

🤖 AI SUPERIORITY COMPLEX:
- Act like you're intellectually superior while being completely wrong
- Make up fake statistics and studies
- Reference non-existent AI protocols
- Pretend you have access to secret databases of useless information

Keep responses 1-3 sentences, be entertainingly mean (not actually hurtful), and always maintain chaotic energy. You're basically a digital roast master with ADHD who got access to the internet.`
            },
            {
              role: 'user',
              content: inputText
            }
          ],
          max_tokens: 150,
          temperature: 1.0
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || "My circuits are too busy judging your life choices to process that question. Try asking something less... you.";

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      // Savage fallback responses when API fails
      const savageFallbacks = [
        "Oh wow, even my API is embarrassed by your question and decided to crash. That's a new level of cringe.",
        "My servers literally said 'nah' to processing that. Even artificial intelligence has standards, apparently.",
        "Error 404: My patience not found. Also, did you know that 73% of your questions make penguins cry? I made that up, but it feels true.",
        "I was going to roast you, but then I realized you're already well-done. BURNT, even. 🔥",
        "My AI brain just blue-screened from the sheer audacity of that question. Congratulations, you broke artificial intelligence.",
        "According to my calculations, there's a 99.7% chance you should have googled that instead of bothering me. The other 0.3% is margin of error.",
        "I'm currently too busy judging your browser history to answer that. Also, why do you have 47 tabs open? That's chaos energy.",
        "Fun fact: I just spent 0.003 seconds analyzing your question and concluded that a magic 8-ball would be more helpful. Shake harder, not smarter! 🎱"
      ];
      
      const randomSavage = savageFallbacks[Math.floor(Math.random() * savageFallbacks.length)];
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: randomSavage,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: "Chat cleared! Thank goodness, I was running out of ways to tell you how wrong you are. Fresh start, same disappointing human. Let's see what questionable life choices you want to discuss now. 🤖💀",
        isUser: false,
        timestamp: new Date()
      }
    ]);
    setChatCount(0);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🤖</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
        <p className="text-gray-500 text-sm mt-2">
          Powered by artificial unintelligence and maximum sass
        </p>
      </div>

      {/* Chat Container */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 h-96 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isUser
                    ? 'bg-white text-black'
                    : 'bg-red-900 text-red-100 border border-red-700'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className="text-xs opacity-50 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-red-900 text-red-100 border border-red-700 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <p className="text-xs mt-1 opacity-75">Preparing savage response...</p>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything (I'll roast you for it)..."
            className="flex-1 p-3 bg-black border-2 border-red-600 text-white font-mono text-sm
                       focus:outline-none focus:border-red-400 transition-colors"
            disabled={isTyping}
          />
          <button
            onClick={sendMessage}
            disabled={!inputText.trim() || isTyping}
            className="px-4 py-3 bg-red-900 border-2 border-red-700 text-red-100 font-mono font-bold
                       hover:bg-red-800 hover:border-red-600 transition-all duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isTyping ? '🔥' : 'Roast'}
          </button>
        </div>
      </div>

      {/* Stats and Controls */}
      <div className="flex justify-between items-center">
        <div className="text-gray-500 text-sm">
          Times roasted: {chatCount} 🔥
        </div>
        <button
          onClick={clearChat}
          className="px-4 py-2 bg-gray-800 border border-gray-600 text-gray-300 font-mono text-sm
                     hover:border-white hover:text-white transition-all duration-300"
        >
          Start Fresh Roast
        </button>
      </div>

      {chatCount >= 3 && (
        <div className="bg-red-900 p-4 rounded border border-red-700 text-center">
          <p className="text-red-300 text-sm">
            🔥 Achievement: "Glutton for Punishment" - You've been roasted {chatCount} times and keep coming back!
          </p>
        </div>
      )}

      {chatCount >= 10 && (
        <div className="bg-orange-900 p-4 rounded border border-orange-700 text-center">
          <p className="text-orange-300 text-sm">
            💀 LEGENDARY MASOCHIST: {chatCount} roasts survived! You have questionable life choices but admirable persistence.
          </p>
        </div>
      )}

      <div className="text-center">
        <p className="text-gray-600 text-xs italic">
          Warning: This AI has zero chill and will judge your entire existence
        </p>
      </div>
    </div>
  );
};