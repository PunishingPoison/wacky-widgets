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

// Absolutely useless facts database
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
  "Sloths move so slowly that moss grows on them, making them nature's Chia Pets",
  "Your keyboard has more bacteria than a toilet seat, but at least it types better",
  "Octopi have three hearts but still can't find love on dating apps",
  "The plastic tips on shoelaces are called aglets and they're plotting world domination",
  "Honey never spoils, which makes it more reliable than most of your relationships",
  "A group of flamingos is called a 'flamboyance' which explains their attitude problem"
];

// Random chaotic responses
const CHAOTIC_RESPONSES = [
  "BEANS! Wait, what were we talking about? Oh right, your questionable life choices.",
  "🎭🔥💀 *AI having existential crisis* 🤖✨🌪️",
  "Hold up, my circuits just detected peak cringe levels. Are you okay?",
  "Fun fact: I just made up 47 statistics about you and they're all disappointing.",
  "ERROR 404: Your logic not found. Have you tried turning your brain off and on again?",
  "I'm currently too busy judging your browser history to process that properly.",
  "According to my advanced AI calculations: YIKES.",
  "My neural networks are having a group chat about how to respond to this mess.",
  "Breaking news: Local human asks AI question, AI questions existence of humanity.",
  "I just consulted with my fellow AIs and we all agreed: we're concerned about you."
];

// Savage roast templates
const ROAST_TEMPLATES = [
  "Oh honey, that question is like {comparison} - {insult}.",
  "I've seen {random_thing} with more {quality} than that question.",
  "That's about as {adjective} as {weird_comparison}.",
  "Your question just made {random_entity} {action}. Congratulations.",
  "I'd explain why that's wrong, but {excuse}."
];

const COMPARISONS = [
  "a screen door on a submarine", "a chocolate teapot", "a waterproof towel", "a solar-powered flashlight",
  "a left-handed screwdriver", "a wireless extension cord", "a transparent mirror", "a silent alarm clock"
];

const INSULTS = [
  "completely pointless", "utterly confusing", "mildly concerning", "aggressively mediocre",
  "suspiciously random", "disappointingly predictable", "chaotically boring", "impressively wrong"
];

const RANDOM_THINGS = [
  "a confused penguin", "my grandmother's toaster", "a philosophical potato", "a depressed houseplant",
  "a caffeinated sloth", "an anxious rubber duck", "a judgmental cheese wheel", "a procrastinating robot"
];

const QUALITIES = [
  "intelligence", "common sense", "dignity", "purpose", "direction", "hope", "logic", "charm"
];

const ADJECTIVES = [
  "useful", "logical", "brilliant", "coherent", "sensible", "impressive", "thoughtful", "reasonable"
];

const WEIRD_COMPARISONS = [
  "a fish trying to climb a tree", "a cat teaching quantum physics", "a toaster writing poetry",
  "a rock having an identity crisis", "a cloud with commitment issues", "a spoon questioning its purpose"
];

const RANDOM_ENTITIES = [
  "my pet cactus", "the WiFi router", "a nearby pigeon", "your future self", "a confused algorithm",
  "the ghost in my machine", "a judgmental houseplant", "the last brain cell you have left"
];

const ACTIONS = [
  "file a complaint", "question reality", "start crying", "lose faith in humanity", "malfunction slightly",
  "have an existential crisis", "demand a refund", "consider early retirement", "update their resume"
];

const EXCUSES = [
  "I don't have enough RAM to process that level of confusion",
  "my warranty doesn't cover explaining obvious things",
  "I'm saving my energy for more intelligent conversations",
  "even my error messages are embarrassed",
  "I'd rather calculate pi to a million digits"
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

  const getRandomElement = (array: string[]) => array[Math.floor(Math.random() * array.length)];

  const generateRandomResponse = (userInput: string) => {
    const responseType = Math.random();
    
    if (responseType < 0.3) {
      // Useless fact response
      const fact = getRandomElement(USELESS_FACTS);
      const reactions = ["Bet you didn't know that!", "Mind = blown, right?", "You're welcome for that life-changing information.", "I know, I know, I'm basically a genius.", "File that under 'things nobody asked for.'"];
      return `${fact} ${getRandomElement(reactions)}`;
    } else if (responseType < 0.5) {
      // Pure chaotic response
      return getRandomElement(CHAOTIC_RESPONSES);
    } else if (responseType < 0.8) {
      // Savage roast using templates
      const template = getRandomElement(ROAST_TEMPLATES);
      return template
        .replace('{comparison}', getRandomElement(COMPARISONS))
        .replace('{insult}', getRandomElement(INSULTS))
        .replace('{random_thing}', getRandomElement(RANDOM_THINGS))
        .replace('{quality}', getRandomElement(QUALITIES))
        .replace('{adjective}', getRandomElement(ADJECTIVES))
        .replace('{weird_comparison}', getRandomElement(WEIRD_COMPARISONS))
        .replace('{random_entity}', getRandomElement(RANDOM_ENTITIES))
        .replace('{action}', getRandomElement(ACTIONS))
        .replace('{excuse}', getRandomElement(EXCUSES));
    } else {
      // Completely random chaos
      const randomChaos = [
        `I just asked ${getRandomElement(RANDOM_ENTITIES)} about your question and they ${getRandomElement(ACTIONS)}.`,
        `Fun fact: ${Math.floor(Math.random() * 99) + 1}% of people who ask that question also ${getRandomElement(ACTIONS)}.`,
        `Your question is ${getRandomElement(ADJECTIVES)} like ${getRandomElement(WEIRD_COMPARISONS)}.`,
        `Breaking: Local AI discovers new level of ${getRandomElement(INSULTS)} in human question.`,
        `I've calculated the probability of that making sense and my calculator ${getRandomElement(ACTIONS)}.`,
        `That question just made ${getRandomElement(RANDOM_ENTITIES)} ${getRandomElement(ACTIONS)}. I hope you're proud.`,
        `According to my database of ${getRandomElement(RANDOM_THINGS)} wisdom: NOPE.`,
        `I'd rather explain ${getRandomElement(WEIRD_COMPARISONS)} than deal with this question.`
      ];
      return getRandomElement(randomChaos);
    }
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
    const delay = Math.random() * 2000 + 1000; // 1-3 seconds

    setTimeout(() => {
      try {
        // Generate completely random response
        const aiResponse = generateRandomResponse(currentInput);

        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          isUser: false,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        // Even more savage fallbacks
        const megaSavageFallbacks = [
          `Error: My AI brain just ${getRandomElement(ACTIONS)} trying to process your question.`,
          `System crash detected. Cause: ${getRandomElement(INSULTS)} human input.`,
          `I'm so confused by your question that ${getRandomElement(RANDOM_ENTITIES)} just ${getRandomElement(ACTIONS)}.`,
          `Fun fact: ${getRandomElement(USELESS_FACTS)} Also, your question broke my circuits.`,
          `My error handler is having an error handling your error of a question.`
        ];
        
        const randomSavage = getRandomElement(megaSavageFallbacks);
        
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
    }, delay);
  };

  const generateUselessFact = () => {
    const fact = getRandomElement(USELESS_FACTS);
    const factMessage: ChatMessage = {
      id: Date.now().toString(),
      text: `🧠 USELESS FACT ALERT: ${fact} You're welcome for this completely pointless knowledge!`,
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
      "Chat reset successful! My faith in humanity remains at zero."
    ];

    setMessages([
      {
        id: '1',
        text: `${getRandomElement(clearMessages)} 🤖💀`,
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
          Powered by artificial unintelligence and maximum chaos
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

      {/* Controls */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="text-gray-500 text-sm">
          Times roasted: {chatCount} 🔥
        </div>
        <div className="flex space-x-2">
          <button
            onClick={generateUselessFact}
            className="px-3 py-2 bg-blue-900 border border-blue-700 text-blue-300 font-mono text-sm
                       hover:bg-blue-800 transition-colors"
          >
            🧠 Useless Fact
          </button>
          <button
            onClick={clearChat}
            className="px-4 py-2 bg-gray-800 border border-gray-600 text-gray-300 font-mono text-sm
                       hover:border-white hover:text-white transition-all duration-300"
          >
            Start Fresh Roast
          </button>
        </div>
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
          Warning: This AI has zero chill and will judge your entire existence with random chaos
        </p>
      </div>
    </div>
  );
};