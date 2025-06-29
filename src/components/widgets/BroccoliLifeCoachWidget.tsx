import React, { useState } from 'react';
import { Widget } from '../../types/reddit';

interface BroccoliLifeCoachWidgetProps {
  widget: Widget;
}

const BROCCOLI_ADVICE = [
  {
    problem: "I'm feeling unmotivated",
    advice: "Listen, you think I wanted to be green? You think I chose this tree-like existence? But here I am, standing tall and nutritious. Sometimes life gives you chlorophyll, and you make the best of it.",
    wisdom: "Growth happens even when you don't feel like it."
  },
  {
    problem: "People don't appreciate me",
    advice: "Kid, I've been called 'little trees' by toddlers and 'gross' by teenagers for decades. But you know what? I'm still here, packed with vitamins and fiber. Your worth isn't determined by other people's taste buds.",
    wisdom: "You can't please everyone, but you can be nutritious anyway."
  },
  {
    problem: "I'm struggling with change",
    advice: "You see these florets? Each one started as a tiny bud. Change is just growth in disguise. I went from a seed to this magnificent green crown. Embrace your transformation.",
    wisdom: "Change is just another word for becoming who you're meant to be."
  },
  {
    problem: "I feel like giving up",
    advice: "Look at me - I'm literally a vegetable that most kids hate, yet I persist. I show up on plates worldwide, bringing nutrition whether people want it or not. That's dedication, my friend.",
    wisdom: "Persistence is the secret ingredient to success."
  },
  {
    problem: "I'm worried about my health",
    advice: "I'm literally made of antioxidants, vitamin C, and fiber. Take care of your body like it's the only one you've got - because it is. Eat your vegetables, including me!",
    wisdom: "Your body is your temple, so don't feed it junk food."
  },
  {
    problem: "I'm having relationship issues",
    advice: "I get along great with cheese, but I'm also fine on my own. Good relationships should enhance your flavor, not mask it. Be yourself, and the right people will appreciate your natural taste.",
    wisdom: "The right people will love you for who you are, stems and all."
  },
  {
    problem: "I'm stressed about work",
    advice: "I spend my entire existence being steamed, boiled, and roasted, yet I maintain my nutritional integrity. Stress is just heat - it can make you stronger if you don't let it overcook you.",
    wisdom: "Pressure can make you tender, but don't let it make you mushy."
  },
  {
    problem: "I don't feel confident",
    advice: "I'm green, tree-shaped, and smell funny when cooked, yet I'm considered a superfood. Confidence isn't about being perfect - it's about knowing your value despite your quirks.",
    wisdom: "Your uniqueness is your superpower."
  }
];

export const BroccoliLifeCoachWidget: React.FC<BroccoliLifeCoachWidgetProps> = ({ widget }) => {
  const [selectedProblem, setSelectedProblem] = useState('');
  const [advice, setAdvice] = useState<any>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [customProblem, setCustomProblem] = useState('');
  const [useCustom, setUseCustom] = useState(false);

  const getAdvice = () => {
    if (!selectedProblem && (!useCustom || !customProblem.trim())) return;
    
    setIsThinking(true);
    setAdvice(null);
    
    setTimeout(() => {
      if (useCustom && customProblem.trim()) {
        const genericAdvice = {
          problem: customProblem,
          advice: "Look, I'm just a vegetable, but I've learned that life is like being in a garden - sometimes you get watered, sometimes you get eaten by bugs, but you keep growing anyway. Your problem is valid, but remember: even weeds can be beautiful if they grow in the right place.",
          wisdom: "Sometimes the best advice comes from the most unexpected sources."
        };
        setAdvice(genericAdvice);
      } else {
        const selectedAdvice = BROCCOLI_ADVICE.find(a => a.problem === selectedProblem);
        setAdvice(selectedAdvice);
      }
      setIsThinking(false);
    }, 3000);
  };

  const reset = () => {
    setSelectedProblem('');
    setAdvice(null);
    setCustomProblem('');
    setUseCustom(false);
    setIsThinking(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🥦</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
        <p className="text-gray-500 text-sm mt-2">
          Nutritional wisdom meets questionable life advice
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="custom-problem"
            checked={useCustom}
            onChange={(e) => setUseCustom(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="custom-problem" className="text-gray-400 text-sm">
            Ask about a specific problem
          </label>
        </div>
        
        {useCustom ? (
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              What's bothering you?
            </label>
            <textarea
              value={customProblem}
              onChange={(e) => setCustomProblem(e.target.value)}
              placeholder="Tell the broccoli about your problems..."
              className="w-full p-3 bg-black border-2 border-white text-white font-mono h-24 resize-none
                         focus:outline-none focus:border-gray-400 transition-colors"
              disabled={isThinking}
            />
          </div>
        ) : (
          <div>
            <label className="block text-gray-400 text-sm mb-3">
              Choose your life problem:
            </label>
            <div className="space-y-2">
              {BROCCOLI_ADVICE.map((item) => (
                <button
                  key={item.problem}
                  onClick={() => setSelectedProblem(item.problem)}
                  className={`w-full p-3 border-2 font-mono text-sm transition-all duration-300 text-left ${
                    selectedProblem === item.problem
                      ? 'border-white bg-white text-black'
                      : 'border-gray-600 text-gray-300 hover:border-white hover:text-white'
                  }`}
                  disabled={isThinking}
                >
                  {item.problem}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <button
          onClick={getAdvice}
          disabled={(!selectedProblem && (!useCustom || !customProblem.trim())) || isThinking}
          className="w-full px-6 py-3 bg-black border-2 border-white text-white font-mono font-bold
                     hover:bg-white hover:text-black transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isThinking ? 'BROCCOLI IS THINKING...' : '🥦 GET BROCCOLI WISDOM'}
        </button>
      </div>
      
      {isThinking && (
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-2">
            <div className="animate-bounce text-2xl">🥦</div>
            <div className="animate-pulse text-2xl">💭</div>
            <div className="animate-bounce text-2xl">✨</div>
          </div>
          <p className="text-gray-400 text-sm">
            The broccoli is consulting its inner wisdom...
          </p>
        </div>
      )}
      
      {advice && !isThinking && (
        <div className="space-y-4">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <div className="flex items-start space-x-4">
              <div className="text-4xl">🥦</div>
              <div className="flex-1">
                <h3 className="text-green-400 font-bold text-lg mb-2">
                  Coach Broccoli Says:
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  "{advice.advice}"
                </p>
                
                <div className="bg-green-900 p-4 rounded border border-green-700">
                  <h4 className="text-green-300 font-bold mb-2">🌟 Broccoli Wisdom:</h4>
                  <p className="text-green-100 italic">
                    "{advice.wisdom}"
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded border border-gray-600 text-center">
            <p className="text-gray-400 text-sm">
              💚 Life coaching session complete • Vitamin C levels: Maximum
            </p>
          </div>
        </div>
      )}
      
      {advice && (
        <div className="text-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-black border border-white text-white font-mono text-sm
                       hover:bg-white hover:text-black transition-all duration-300"
          >
            Get More Vegetable Wisdom
          </button>
        </div>
      )}
      
      <div className="text-center">
        <p className="text-gray-600 text-xs italic">
          Disclaimer: This broccoli is not a licensed therapist, but it is high in fiber
        </p>
      </div>
    </div>
  );
};