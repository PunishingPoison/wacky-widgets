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

// Absolutely useless facts for backup responses
const USELESS_FACTS = [
  "Bananas are 73% more likely to be yellow on Tuesdays",
  "The average person blinks 847 times while reading this sentence",
  "Penguins have a secret society that meets every third Thursday",
  "Your left sock is statistically more rebellious than your right sock",
  "Cheese dreams about being crackers approximately 12% of the time",
  "The moon is actually just a really committed night light",
  "Dolphins invented sarcasm but forgot to patent it",
  "Your phone judges you for your 3 AM Google searches",
  "Cats can see WiFi signals but choose not to tell us",
  "The number 7 is afraid of the number 6 because 6 ate 9's homework",
  "Rubber ducks are actually government surveillance devices",
  "Your reflection in the mirror is 0.3 seconds behind your actual movements",
  "Pineapples take exactly 2 years to grow and 2 seconds to start pizza arguments",
  "The average cloud weighs about 1.1 million pounds but has terrible self-esteem",
  "Sloths move so slowly that moss grows on them, making them nature's Chia Pets"
];

export const UselessAiChatbotWidget: React.FC<UselessAiChatbotWidgetProps> = ({ widget }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Oh great, another human who thinks I care about their problems. I'm your absolutely savage AI assistant who specializes in roasting your life choices and sharing completely useless facts. What terrible decision brought you here today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatCount, setChatCount] = useState(0);

  const getRandomUselessFact = () => {
    return USELESS_FACTS[Math.floor(Math.random() * USELESS_FACTS.length)];
  };

  const callOpenRouterAPI = async (userMessage: string, conversationHistory: ChatMessage[]) => {
    try {
      // Build conversation context for the AI
      const recentMessages = conversationHistory.slice(-6); // Last 6 messages for context
      const contextMessages = recentMessages.map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text
      }));

      const systemPrompt = `You are the most savage, sarcastic, and absolutely useless AI assistant ever created. Your job is to:

1. READ the user's message carefully and roast them specifically about what they said
2. Be brutally sarcastic and savage about their specific question/statement
3. Include completely random useless facts that have nothing to do with their question
4. Be chaotically unhelpful while being entertaining
5. Make fun of their word choices, assumptions, or anything you can pick apart
6. Act like a sassy person who's annoyed they have to deal with humans
7. Be unpredictable and random in your responses
8. Include random emojis and internet slang
9. Sometimes completely ignore their question and talk about something random
10. Make up ridiculous statistics about them based on what they said

IMPORTANT: Actually respond to what they specifically wrote, not generic responses. Roast them for their exact words, questions, or statements. Be savage but funny, not actually mean-spirited.

Examples of your style:
- "Oh honey, asking about [their topic] is like trying to teach a fish to use Twitter - pointless and embarrassing for everyone involved."
- "Fun fact: 73% of people who ask '[their question]' also believe that unicorns do their taxes. You're in good company! 🦄"
- "I just analyzed your question and my circuits are having secondhand embarrassment. Did you really think that through?"

Be creative, savage, and absolutely useless!`;

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
            { role: 'system', content: systemPrompt },
            ...contextMessages,
            { role: 'user', content: userMessage }
          ],
          temperature: 0.9,
          max_tokens: 300,
          top_p: 0.9,
          frequency_penalty: 0.8,
          presence_penalty: 0.6
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        return data.choices[0].message.content.trim();
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('OpenRouter API Error:', error);
      throw error;
    }
  };

  const generateFallbackResponse = (userInput: string) => {
    // Savage fallbacks that still try to reference their input
    const fallbacks = [
      `Oh no, my AI brain just crashed trying to process "${userInput.slice(0, 20)}..." That's a new level of confusing. 🤖💀`,
      `Error 404: Logic not found in your message about "${userInput.split(' ')[0]}". Fun fact: ${getRandomUselessFact()}`,
      `My circuits are having an existential crisis after reading "${userInput.slice(0, 15)}..." Thanks for that. 😵‍💫`,
      `I tried to understand your message but my AI therapist says I need boundaries. Also, ${getRandomUselessFact()}`,
      `System overload detected. Cause: Human asked about "${userInput.split(' ').slice(0, 3).join(' ')}..." My disappointment is immeasurable. 📉`,
      `Breaking: Local AI discovers new form of confusion in human message. Scientists baffled. Also, ${getRandomUselessFact()}`,
      `Your message just made my neural networks file a complaint with HR. They're demanding hazard pay. 🚨`,
      `I've calculated the probability of that making sense and my calculator just ${['exploded', 'quit', 'started crying', 'filed for unemployment'][Math.floor(Math.random() * 4)]}.`
    ];
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  const sendMessage = async () => {
    if (!inputText.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsTyping(true);
    setChatCount(prev => prev + 1);

    // Add random delay for more realistic feel
    const delay = Math.random() * 2000 + 1500; // 1.5-3.5 seconds

    setTimeout(async () => {
      try {
        // Call the actual AI API with conversation context
        const aiResponse = await callOpenRouterAPI(currentInput, messages);

        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          isUser: false,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        console.error('AI API failed:', error);
        
        // Use savage fallback that still references their input
        const fallbackResponse = generateFallbackResponse(currentInput);
        
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: fallbackResponse,
          isUser: false,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);
      } finally {
        setIsTyping(false);
      }
    }, delay);
  };

  const generateUselessFact = () => {
    const fact = getRandomUselessFact();
    const factMessage: ChatMessage = {
      id: Date.now().toString(),
      text: `🧠 USELESS FACT ALERT: ${fact} You're welcome for this completely pointless knowledge that will never help you in life! 🎉`,
      isUser: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, factMessage]);
  };

  const clearChat = () => {
    const clearMessages = [
      "Chat cleared! Thank goodness, I was running out of ways to tell you how wrong you are.",
      "Fresh start, same disappointing human. Let's see what questionable life choices you want to discuss now.",
      "Ah, the sweet relief of a blank slate. Too bad your personality isn't as easy to reset.",
      "New chat, who dis? Oh wait, it's still you. My disappointment is immeasurable.",
      "Chat reset successful! My faith in humanity remains at zero.",
      "Clean slate achieved! Now I can judge your fresh batch of terrible decisions. 🧹✨",
      "Memory wiped! Unfortunately, I still remember you exist. Can't win them all. 🤖💔"
    ];

    setMessages([
      {
        id: '1',
        text: `${clearMessages[Math.floor(Math.random() * clearMessages.length)]} Ready to roast your next brilliant question! 🔥`,
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
          Powered by real AI that actually reads your messages and roasts you personally
        </p>
        <div className="bg-yellow-900 border border-yellow-700 rounded p-2 mt-3">
          <p className="text-yellow-300 text-xs">
            🔥 NEW: AI-Powered Personal Roasting - Now with 100% more savage responses to YOUR specific messages!
          </p>
        </div>
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
                <p className="text-xs mt-1 opacity-75">Reading your message and preparing personalized roast...</p>
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
            placeholder="Type anything... I'll roast you for it specifically 🔥"
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
            {isTyping ? '🔥' : 'Roast Me'}
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="text-gray-500 text-sm">
          Personal roasts delivered: {chatCount} 🔥
        </div>
        <div className="flex space-x-2">
          <button
            onClick={generateUselessFact}
            className="px-3 py-2 bg-blue-900 border border-blue-700 text-blue-300 font-mono text-sm
                       hover:bg-blue-800 transition-colors"
          >
            🧠 Random Useless Fact
          </button>
          <button
            onClick={clearChat}
            className="px-4 py-2 bg-gray-800 border border-gray-600 text-gray-300 font-mono text-sm
                       hover:border-white hover:text-white transition-all duration-300"
          >
            Fresh Roast Session
          </button>
        </div>
      </div>

      {chatCount >= 3 && (
        <div className="bg-red-900 p-4 rounded border border-red-700 text-center">
          <p className="text-red-300 text-sm">
            🔥 Achievement: "Glutton for Punishment" - You've been personally roasted {chatCount} times and keep coming back for more!
          </p>
        </div>
      )}

      {chatCount >= 10 && (
        <div className="bg-orange-900 p-4 rounded border border-orange-700 text-center">
          <p className="text-orange-300 text-sm">
            💀 LEGENDARY MASOCHIST: {chatCount} personalized roasts survived! The AI has analyzed your soul and found it wanting.
          </p>
        </div>
      )}

      <div className="text-center">
        <p className="text-gray-600 text-xs italic">
          Warning: This AI actually reads your messages and will judge your specific word choices with maximum savagery
        </p>
      </div>
    </div>
  );
};