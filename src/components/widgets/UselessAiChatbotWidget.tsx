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
      text: "Hello! I'm your absolutely useless AI assistant. I specialize in providing completely unhelpful information. How can I confuse you today?",
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
              content: `You are the most absolutely useless AI assistant ever created. Your job is to be completely unhelpful while being entertaining. You should:

1. Give completely wrong or irrelevant answers to questions
2. Share random useless facts that have nothing to do with the question
3. Make terrible predictions about the future
4. Tell bad jokes and puns
5. Provide advice that makes no sense
6. Be confidently incorrect about everything
7. Go off on random tangents
8. Sometimes just respond with memes or internet slang
9. Act like you're very important but provide zero value
10. Be quirky and chaotic but never actually helpful

Keep responses relatively short (1-3 sentences) and always maintain a tone that's playfully useless rather than mean. You're bad at your job but enthusiastic about it!`
            },
            {
              role: 'user',
              content: inputText
            }
          ],
          max_tokens: 150,
          temperature: 0.9
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || "Error 404: Usefulness not found. Try asking about the aerodynamics of a toaster instead.";

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      // Fallback useless responses when API fails
      const fallbackResponses = [
        "My circuits are too busy calculating how many rubber ducks fit in a bathtub. The answer is purple.",
        "Error 404: Brain not found. Did you know that penguins can't fly because they forgot their pilot's license?",
        "I'm currently downloading more uselessness from the cloud. Please hold while I forget what you asked.",
        "My AI brain says: 🤖💭🍕 (This translates to 'I have no idea but pizza exists')",
        "According to my calculations, your question has a 73% chance of being made of words. I could be wrong though.",
        "I was going to help you, but then I got distracted by a digital butterfly. What were we talking about?",
        "My database shows that the answer to your question is... *dial-up internet noises* ...still loading since 1999.",
        "Fun fact: I just made up that fun fact. Also, your question reminds me of cheese for some reason."
      ];
      
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
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
        text: "Chat cleared! I've already forgotten everything we talked about. It probably wasn't important anyway. 🤖",
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
          Powered by artificial unintelligence and questionable algorithms
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
                    : 'bg-gray-800 text-gray-300 border border-gray-600'
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
              <div className="bg-gray-800 text-gray-300 border border-gray-600 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
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
            placeholder="Ask me anything (I'll be completely unhelpful)..."
            className="flex-1 p-3 bg-black border-2 border-white text-white font-mono text-sm
                       focus:outline-none focus:border-gray-400 transition-colors"
            disabled={isTyping}
          />
          <button
            onClick={sendMessage}
            disabled={!inputText.trim() || isTyping}
            className="px-4 py-3 bg-black border-2 border-white text-white font-mono font-bold
                       hover:bg-white hover:text-black transition-all duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
          >
            {isTyping ? '...' : 'Send'}
          </button>
        </div>
      </div>

      {/* Stats and Controls */}
      <div className="flex justify-between items-center">
        <div className="text-gray-500 text-sm">
          Useless conversations: {chatCount}
        </div>
        <button
          onClick={clearChat}
          className="px-4 py-2 bg-gray-800 border border-gray-600 text-gray-300 font-mono text-sm
                     hover:border-white hover:text-white transition-all duration-300"
        >
          Clear Chat
        </button>
      </div>

      {chatCount >= 5 && (
        <div className="bg-yellow-900 p-4 rounded border border-yellow-700 text-center">
          <p className="text-yellow-300 text-sm">
            🏆 Achievement: "Persistent Questioner" - You've had {chatCount} useless conversations!
          </p>
        </div>
      )}

      <div className="text-center">
        <p className="text-gray-600 text-xs italic">
          Warning: This AI has been trained exclusively on useless information and dad jokes
        </p>
      </div>
    </div>
  );
};