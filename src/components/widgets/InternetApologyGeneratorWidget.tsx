import React, { useState } from 'react';
import { Widget } from '../../types/reddit';

interface InternetApologyGeneratorWidgetProps {
  widget: Widget;
}

const APOLOGY_TEMPLATES = [
  {
    offense: "Existing on the internet",
    apology: "I sincerely apologize for my digital presence. I should have considered how my mere existence online might affect others. I'm taking a break to reflect on my pixels.",
    severity: "Mild"
  },
  {
    offense: "Having an opinion",
    apology: "I deeply regret expressing a thought. I realize now that having opinions is problematic and I should have kept my brain activity to myself. I'm sorry for thinking.",
    severity: "Moderate"
  },
  {
    offense: "Breathing too loudly in a Zoom call",
    apology: "I am mortified by my respiratory choices during our virtual meeting. My breathing was inconsiderate and I take full responsibility for my lung function. I'm enrolling in silent breathing classes.",
    severity: "Severe"
  },
  {
    offense: "Using the wrong emoji",
    apology: "I am devastated by my emoji selection. The 😊 was clearly inappropriate for the context and I should have used 🙂 instead. I'm consulting with emoji experts to prevent future incidents.",
    severity: "Critical"
  },
  {
    offense: "Liking a post from 2019",
    apology: "I am horrified by my accidental archaeological social media activity. Liking a post from 2019 was a grave error in digital etiquette. I'm deleting my entire internet history as penance.",
    severity: "Catastrophic"
  },
  {
    offense: "Not responding to a text within 3 minutes",
    apology: "I am deeply ashamed of my delayed response time. Those 4 minutes of silence were inexcusable and I understand if you never trust me again. I'm getting a faster phone.",
    severity: "Moderate"
  },
  {
    offense: "Asking 'How are you?' and actually wanting an answer",
    apology: "I apologize for my genuine interest in your wellbeing. I should have known this was just a greeting ritual and not an actual inquiry. I'm practicing superficial small talk.",
    severity: "Mild"
  },
  {
    offense: "Eating lunch at my desk",
    apology: "I am sorry for nourishing my body during work hours. The sound of my sandwich was unprofessional and I should have considered photosynthesis instead. I'm switching to liquid nutrients.",
    severity: "Severe"
  },
  {
    offense: "Having a different favorite color",
    apology: "I deeply regret my color preferences. Blue was clearly the wrong choice and I should have consulted the group before having personal tastes. I'm colorblind now.",
    severity: "Critical"
  },
  {
    offense: "Sneezing in public",
    apology: "I am mortified by my involuntary nasal explosion. Despite saying 'excuse me,' I realize the damage was done. I'm having my sinuses surgically removed to prevent future incidents.",
    severity: "Catastrophic"
  }
];

export const InternetApologyGeneratorWidget: React.FC<InternetApologyGeneratorWidgetProps> = ({ widget }) => {
  const [currentApology, setCurrentApology] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customOffense, setCustomOffense] = useState('');
  const [useCustom, setUseCustom] = useState(false);

  const generateApology = () => {
    setIsGenerating(true);
    setCurrentApology(null);
    
    setTimeout(() => {
      if (useCustom && customOffense.trim()) {
        const customApology = {
          offense: customOffense,
          apology: `I am deeply sorry for ${customOffense.toLowerCase()}. This was completely inappropriate and I take full responsibility for my actions. I'm seeking professional help and will do better in the future.`,
          severity: ["Mild", "Moderate", "Severe", "Critical", "Catastrophic"][Math.floor(Math.random() * 5)]
        };
        setCurrentApology(customApology);
      } else {
        const randomApology = APOLOGY_TEMPLATES[Math.floor(Math.random() * APOLOGY_TEMPLATES.length)];
        setCurrentApology(randomApology);
      }
      setIsGenerating(false);
    }, 2500);
  };

  const reset = () => {
    setCurrentApology(null);
    setCustomOffense('');
    setUseCustom(false);
    setIsGenerating(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Mild': return 'text-green-400';
      case 'Moderate': return 'text-yellow-400';
      case 'Severe': return 'text-orange-400';
      case 'Critical': return 'text-red-400';
      case 'Catastrophic': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">😔</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
        <p className="text-gray-500 text-sm mt-2">
          Sorry for things you didn't even know you did wrong
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="custom-offense"
            checked={useCustom}
            onChange={(e) => setUseCustom(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="custom-offense" className="text-gray-400 text-sm">
            Apologize for something specific
          </label>
        </div>
        
        {useCustom && (
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              What do you need to apologize for?
            </label>
            <input
              type="text"
              value={customOffense}
              onChange={(e) => setCustomOffense(e.target.value)}
              placeholder="e.g., eating the last donut, existing, having opinions..."
              className="w-full p-3 bg-black border-2 border-white text-white font-mono
                         focus:outline-none focus:border-gray-400 transition-colors"
              disabled={isGenerating}
            />
          </div>
        )}
        
        <button
          onClick={generateApology}
          disabled={isGenerating || (useCustom && !customOffense.trim())}
          className="w-full px-6 py-3 bg-black border-2 border-white text-white font-mono font-bold
                     hover:bg-white hover:text-black transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
        >
          {isGenerating ? 'CRAFTING APOLOGY...' : '😔 GENERATE APOLOGY'}
        </button>
      </div>
      
      {isGenerating && (
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-2">
            <div className="animate-bounce text-2xl">😔</div>
            <div className="animate-pulse text-2xl">📝</div>
            <div className="animate-bounce text-2xl">💔</div>
          </div>
          <p className="text-gray-400 text-sm">
            Consulting the archives of unnecessary guilt...
          </p>
        </div>
      )}
      
      {currentApology && !isGenerating && (
        <div className="space-y-4">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">😔</div>
              <h3 className="text-white font-bold text-lg">Formal Apology</h3>
            </div>
            
            <div className="bg-red-900 p-4 rounded border border-red-700 mb-4">
              <h4 className="text-red-300 font-bold mb-2">Offense:</h4>
              <p className="text-red-100">{currentApology.offense}</p>
            </div>
            
            <div className="bg-black p-6 rounded border border-gray-600 mb-4">
              <h4 className="text-white font-bold mb-3">Official Apology:</h4>
              <p className="text-gray-300 text-lg leading-relaxed italic">
                "{currentApology.apology}"
              </p>
            </div>
            
            <div className="bg-gray-800 p-4 rounded border border-gray-600 text-center">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Severity Level:</span>
                <span className={`font-mono font-bold text-lg ${getSeverityColor(currentApology.severity)}`}>
                  {currentApology.severity}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-900 p-4 rounded border border-yellow-700 text-center">
            <p className="text-yellow-300 text-sm">
              ⚠️ This apology has been pre-approved by the Internet Guilt Committee
            </p>
          </div>
        </div>
      )}
      
      {currentApology && (
        <div className="text-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-black border border-white text-white font-mono text-sm
                       hover:bg-white hover:text-black transition-all duration-300"
          >
            Apologize for Something Else
          </button>
        </div>
      )}
      
      <div className="text-center">
        <p className="text-gray-600 text-xs italic">
          Disclaimer: You probably didn't actually do anything wrong
        </p>
      </div>
    </div>
  );
};