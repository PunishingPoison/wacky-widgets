import React, { useState } from 'react';
import { Widget } from '../../types/reddit';

interface IsItToastedWidgetProps {
  widget: Widget;
}

const RANDOM_OBJECTS = [
  "A rubber duck", "Your left shoe", "A houseplant", "A coffee mug", "A paperclip",
  "A banana", "Your phone", "A pillow", "A pencil", "A doorknob",
  "A cloud", "Your dignity", "A parking meter", "A cactus", "A traffic cone",
  "Your hopes and dreams", "A stapler", "A rubber band", "A light bulb", "A sock",
  "A pizza slice", "Your motivation", "A keyboard", "A spoon", "A rock"
];

const TOASTINESS_LEVELS = [
  { level: "Not Toasted", percentage: 0, description: "Completely raw. Hasn't even seen a toaster.", color: "text-blue-400" },
  { level: "Barely Warmed", percentage: 15, description: "Slightly less cold than before.", color: "text-cyan-400" },
  { level: "Lightly Toasted", percentage: 35, description: "Golden brown around the edges.", color: "text-yellow-400" },
  { level: "Perfectly Toasted", percentage: 65, description: "Crispy perfection achieved.", color: "text-orange-400" },
  { level: "Well Toasted", percentage: 85, description: "Dark and crunchy, just how some people like it.", color: "text-red-400" },
  { level: "Burnt to a Crisp", percentage: 100, description: "Charcoal. Completely inedible.", color: "text-gray-400" }
];

export const IsItToastedWidget: React.FC<IsItToastedWidgetProps> = ({ widget }) => {
  const [currentObject, setCurrentObject] = useState('');
  const [toastinessResult, setToastinessResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [customObject, setCustomObject] = useState('');
  const [useCustom, setUseCustom] = useState(false);

  const analyzeToastiness = () => {
    setIsAnalyzing(true);
    setToastinessResult(null);
    
    const objectToAnalyze = useCustom && customObject.trim() ? customObject : 
                           RANDOM_OBJECTS[Math.floor(Math.random() * RANDOM_OBJECTS.length)];
    setCurrentObject(objectToAnalyze);
    
    setTimeout(() => {
      const randomLevel = TOASTINESS_LEVELS[Math.floor(Math.random() * TOASTINESS_LEVELS.length)];
      const confidence = Math.floor(Math.random() * 40) + 60; // 60-99% confidence
      
      setToastinessResult({
        ...randomLevel,
        confidence,
        scientificReason: generateScientificReason(objectToAnalyze, randomLevel)
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const generateScientificReason = (object: string, level: any) => {
    const reasons = [
      `The molecular structure of ${object.toLowerCase()} shows clear signs of Maillard reaction at ${level.percentage}% completion.`,
      `Spectral analysis reveals ${object.toLowerCase()} has achieved optimal browning through controlled heat exposure.`,
      `The carbon content in ${object.toLowerCase()} indicates ${level.level.toLowerCase()} status according to the International Toastiness Scale.`,
      `Thermal imaging confirms ${object.toLowerCase()} has reached the ${level.level.toLowerCase()} threshold of 350°F surface temperature.`,
      `Laboratory tests show ${object.toLowerCase()} exhibits classic toasting patterns consistent with ${level.percentage}% doneness.`
    ];
    return reasons[Math.floor(Math.random() * reasons.length)];
  };

  const reset = () => {
    setCurrentObject('');
    setToastinessResult(null);
    setCustomObject('');
    setUseCustom(false);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🍞</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
        <p className="text-gray-500 text-sm mt-2">
          Evaluating random objects for their toastiness level
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="custom-object"
            checked={useCustom}
            onChange={(e) => setUseCustom(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="custom-object" className="text-gray-400 text-sm">
            Test a specific object
          </label>
        </div>
        
        {useCustom && (
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              What object should we analyze?
            </label>
            <input
              type="text"
              value={customObject}
              onChange={(e) => setCustomObject(e.target.value)}
              placeholder="e.g., my sandwich, the moon, my ex's heart..."
              className="w-full p-3 bg-black border-2 border-white text-white font-mono
                         focus:outline-none focus:border-gray-400 transition-colors"
              disabled={isAnalyzing}
            />
          </div>
        )}
        
        <button
          onClick={analyzeToastiness}
          disabled={isAnalyzing || (useCustom && !customObject.trim())}
          className="w-full px-6 py-3 bg-black border-2 border-white text-white font-mono font-bold
                     hover:bg-white hover:text-black transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
        >
          {isAnalyzing ? 'ANALYZING TOASTINESS...' : '🍞 CHECK TOASTINESS LEVEL'}
        </button>
      </div>
      
      {isAnalyzing && (
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-2">
            <div className="animate-bounce text-2xl">🍞</div>
            <div className="animate-spin text-2xl">🔬</div>
            <div className="animate-pulse text-2xl">📊</div>
          </div>
          <p className="text-gray-400 text-sm">
            Running advanced toastiness algorithms...
          </p>
          <div className="text-gray-600 text-xs">
            Calibrating thermal sensors... Please wait...
          </div>
        </div>
      )}
      
      {toastinessResult && !isAnalyzing && (
        <div className="space-y-4">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🍞</div>
              <h3 className="text-white font-bold text-xl">Toastiness Analysis</h3>
              <p className="text-gray-400">Subject: {currentObject}</p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-black p-4 rounded border border-gray-600">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Toastiness Level:</span>
                  <span className={`font-mono font-bold text-lg ${toastinessResult.color}`}>
                    {toastinessResult.level}
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-1000 ${
                      toastinessResult.percentage < 30 ? 'bg-blue-400' :
                      toastinessResult.percentage < 60 ? 'bg-yellow-400' :
                      toastinessResult.percentage < 90 ? 'bg-orange-400' : 'bg-red-400'
                    }`}
                    style={{ width: `${toastinessResult.percentage}%` }}
                  ></div>
                </div>
                <p className="text-gray-400 text-sm mt-2">{toastinessResult.description}</p>
              </div>
              
              <div className="bg-gray-800 p-4 rounded border border-gray-600">
                <h4 className="text-white font-bold mb-2">Scientific Analysis:</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {toastinessResult.scientificReason}
                </p>
              </div>
              
              <div className="bg-blue-900 p-4 rounded border border-blue-700 text-center">
                <p className="text-blue-300 text-sm">
                  🔬 Analysis Confidence: {toastinessResult.confidence}%
                </p>
                <p className="text-blue-200 text-xs mt-1">
                  Certified by the International Bureau of Toastiness Standards
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {toastinessResult && (
        <div className="text-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-black border border-white text-white font-mono text-sm
                       hover:bg-white hover:text-black transition-all duration-300"
          >
            Test Another Object
          </button>
        </div>
      )}
      
      <div className="text-center">
        <p className="text-gray-600 text-xs italic">
          Results may vary. Not responsible for actual toasting of non-bread items.
        </p>
      </div>
    </div>
  );
};