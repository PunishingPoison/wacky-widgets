import React, { useState } from 'react';
import { Widget } from '../../types/reddit';

interface DramaticRecipeWidgetProps {
  widget: Widget;
}

const DRAMATIC_RECIPES = [
  {
    dish: "Tragic Toast",
    ingredients: [
      "1 slice of bread (preferably with a troubled past)",
      "Butter (that has seen better days)",
      "A pinch of existential dread",
      "Hope (optional, but recommended)"
    ],
    steps: [
      "Gaze longingly at the bread, contemplating its journey from wheat to your kitchen.",
      "Heat the toaster with the intensity of a thousand burning suns.",
      "Place the bread inside, whispering words of encouragement.",
      "Wait. The anticipation is unbearable. This is your life now.",
      "When the toast emerges, golden and triumphant, shed a single tear of joy.",
      "Apply butter with the tenderness of a mother's love.",
      "Consume while reflecting on the fleeting nature of breakfast."
    ],
    drama: "This recipe has been passed down through generations of people who take breakfast way too seriously."
  },
  {
    dish: "Melodramatic Mac and Cheese",
    ingredients: [
      "1 box of pasta (each piece a tiny cylinder of dreams)",
      "Cheese (aged like fine wine and regret)",
      "Milk (from cows who understand suffering)",
      "Butter (churned by the tears of angels)",
      "Salt (to taste, and to represent life's bitterness)"
    ],
    steps: [
      "Boil water with the fury of your inner demons.",
      "Add pasta and watch it dance in the bubbling cauldron of destiny.",
      "While pasta cooks, contemplate the meaning of comfort food.",
      "Drain pasta, but save some water - like memories, it might be useful later.",
      "Melt cheese with the passion of a thousand romance novels.",
      "Combine ingredients while sobbing dramatically about how perfect this moment is.",
      "Serve immediately, before the magic fades like youth and innocence."
    ],
    drama: "This dish has caused more emotional breakdowns than any other comfort food in history."
  },
  {
    dish: "Existential Scrambled Eggs",
    ingredients: [
      "3 eggs (each one a universe of potential)",
      "Butter (the fat that binds us all)",
      "Salt and pepper (the yin and yang of seasoning)",
      "A splash of milk (for creaminess and metaphor)"
    ],
    steps: [
      "Crack eggs with the weight of your life's disappointments.",
      "Whisk vigorously, as if beating away your troubles.",
      "Heat pan to medium - not too hot, not too cold, like your feelings about everything.",
      "Add butter and watch it melt like your childhood dreams.",
      "Pour in eggs and stir gently, like you're stirring the cosmos itself.",
      "Remove from heat while still slightly wet - perfection is a myth anyway.",
      "Serve on a plate that has seen better days, just like all of us."
    ],
    drama: "These eggs have witnessed more kitchen breakdowns than any breakfast should."
  }
];

export const DramaticRecipeWidget: React.FC<DramaticRecipeWidgetProps> = ({ widget }) => {
  const [currentRecipe, setCurrentRecipe] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  const generateRecipe = () => {
    setIsGenerating(true);
    setCurrentRecipe(null);
    setShowSteps(false);
    
    setTimeout(() => {
      const randomRecipe = DRAMATIC_RECIPES[Math.floor(Math.random() * DRAMATIC_RECIPES.length)];
      setCurrentRecipe(randomRecipe);
      setIsGenerating(false);
    }, 2500);
  };

  const toggleSteps = () => {
    setShowSteps(!showSteps);
  };

  const reset = () => {
    setCurrentRecipe(null);
    setShowSteps(false);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🎭</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
        <p className="text-gray-500 text-sm mt-2">
          Cooking instructions with unnecessary emotional intensity
        </p>
      </div>
      
      <div className="text-center">
        <button
          onClick={generateRecipe}
          disabled={isGenerating}
          className="px-6 py-3 bg-black border-2 border-white text-white font-mono font-bold
                     hover:bg-white hover:text-black transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'CHANNELING CULINARY DRAMA...' : '🎭 GENERATE DRAMATIC RECIPE'}
        </button>
      </div>
      
      {isGenerating && (
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-2">
            <div className="animate-bounce text-2xl">🎭</div>
            <div className="animate-spin text-2xl">👨‍🍳</div>
            <div className="animate-pulse text-2xl">📖</div>
          </div>
          <p className="text-gray-400 text-sm">
            Consulting the archives of overly emotional cooking...
          </p>
        </div>
      )}
      
      {currentRecipe && !isGenerating && (
        <div className="space-y-4">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <div className="text-center mb-6">
              <h3 className="text-white font-bold text-2xl">{currentRecipe.dish}</h3>
              <p className="text-gray-400 text-sm italic mt-2">{currentRecipe.drama}</p>
            </div>
            
            <div className="bg-black p-6 rounded border border-gray-600 mb-4">
              <h4 className="text-white font-bold mb-3">🛒 Ingredients of Destiny:</h4>
              <ul className="space-y-2">
                {currentRecipe.ingredients.map((ingredient: string, index: number) => (
                  <li key={index} className="text-gray-300 flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-center">
              <button
                onClick={toggleSteps}
                className="px-4 py-2 bg-red-900 border border-red-700 text-red-300 font-mono
                           hover:bg-red-800 transition-colors"
              >
                {showSteps ? '🙈 Hide the Drama' : '🎭 Reveal Cooking Drama'}
              </button>
            </div>
            
            {showSteps && (
              <div className="bg-red-900 p-6 rounded border border-red-700 mt-4">
                <h4 className="text-red-300 font-bold mb-4">🎬 Dramatic Instructions:</h4>
                <ol className="space-y-3">
                  {currentRecipe.steps.map((step: string, index: number) => (
                    <li key={index} className="text-red-100 flex items-start">
                      <span className="text-red-400 font-bold mr-3 min-w-[1.5rem]">{index + 1}.</span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
          
          <div className="bg-yellow-900 p-4 rounded border border-yellow-700 text-center">
            <p className="text-yellow-300 text-sm">
              ⚠️ Warning: This recipe may cause excessive emotional attachment to food
            </p>
          </div>
        </div>
      )}
      
      {currentRecipe && (
        <div className="text-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-black border border-white text-white font-mono text-sm
                       hover:bg-white hover:text-black transition-all duration-300"
          >
            Cook Something Else Dramatically
          </button>
        </div>
      )}
    </div>
  );
};