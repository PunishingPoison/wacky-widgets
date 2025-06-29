import React from 'react';
import { Widget } from '../types/reddit';
import { ShowerthoughtWidget } from './widgets/ShowerthoughtWidget';
import { ClickCounterWidget } from './widgets/ClickCounterWidget';
import { SpinnerWidget } from './widgets/SpinnerWidget';
import { CatMeowWidget } from './widgets/CatMeowWidget';
import { ConspiracyWidget } from './widgets/ConspiracyWidget';
import { GenericWidget } from './widgets/GenericWidget';
import { FloatingBubbleWidget } from './widgets/FloatingBubbleWidget';
import { FortuneCookieWidget } from './widgets/FortuneCookieWidget';
import { ReverseTypingWidget } from './widgets/ReverseTypingWidget';
import { UselessStatsWidget } from './widgets/UselessStatsWidget';
import { SandwichTherapistWidget } from './widgets/SandwichTherapistWidget';
import { TimeTravelWidget } from './widgets/TimeTravelWidget';
import { MemeTranslatorWidget } from './widgets/MemeTranslatorWidget';
import { AiSpiritAnimalWidget } from './widgets/AiSpiritAnimalWidget';
import { RedditMemeZodiacWidget } from './widgets/RedditMemeZodiacWidget';
import { ExplainMemeAiWidget } from './widgets/ExplainMemeAiWidget';
import { MiniRedditReelsWidget } from './widgets/MiniRedditReelsWidget';
import { ConspiracyGeneratorWidget } from './widgets/ConspiracyGeneratorWidget';
import { ChaoticCommentTheaterWidget } from './widgets/ChaoticCommentTheaterWidget';
import { MemeSpiritWeaponWidget } from './widgets/MemeSpiritWeaponWidget';

// Import working widgets
import { EmotionalCheeseGraterWidget } from './widgets/EmotionalCheeseGraterWidget';
import { AiTherapistRoasterWidget } from './widgets/AiTherapistRoasterWidget';
import { InterdimensionalTodoWidget } from './widgets/InterdimensionalTodoWidget';
import { OutOfContextQuotesWidget } from './widgets/OutOfContextQuotesWidget';
import { SarcasticDictionaryWidget } from './widgets/SarcasticDictionaryWidget';
import { TimeTravelerDiaryWidget } from './widgets/TimeTravelerDiaryWidget';
import { WrongHistoricalEventsWidget } from './widgets/WrongHistoricalEventsWidget';
import { HauntedCalculatorWidget } from './widgets/HauntedCalculatorWidget';
import { PetRockMoodWidget } from './widgets/PetRockMoodWidget';
import { AiDreamsWidget } from './widgets/AiDreamsWidget';
import { InternetApologyGeneratorWidget } from './widgets/InternetApologyGeneratorWidget';
import { IsItToastedWidget } from './widgets/IsItToastedWidget';
import { EmotionNumberGeneratorWidget } from './widgets/EmotionNumberGeneratorWidget';
import { PotatoDestinyWidget } from './widgets/PotatoDestinyWidget';
import { DramaticRecipeWidget } from './widgets/DramaticRecipeWidget';
import { BroccoliLifeCoachWidget } from './widgets/BroccoliLifeCoachWidget';
import { HonestMirrorWidget } from './widgets/HonestMirrorWidget';
import { PigeonSandwichRaterWidget } from './widgets/PigeonSandwichRaterWidget';
import { LifeAchievementUnlockedWidget } from './widgets/LifeAchievementUnlockedWidget';
import { UselessAiChatbotWidget } from './widgets/UselessAiChatbotWidget';

interface WidgetContainerProps {
  widget: Widget;
  isLoading: boolean;
}

export const WidgetContainer: React.FC<WidgetContainerProps> = ({ widget, isLoading }) => {
  const renderWidget = () => {
    if (isLoading) {
      return (
        <div className="text-center py-12">
          <div className="animate-spin text-4xl mb-4">⚙️</div>
          <p className="text-gray-400">Fetching your next dose of digital absurdity...</p>
        </div>
      );
    }

    switch (widget.type) {
      // Original widgets
      case 'showerthought':
        return <ShowerthoughtWidget widget={widget} />;
      case 'floating-bubble':
        return <FloatingBubbleWidget widget={widget} />;
      case 'click-counter':
        return <ClickCounterWidget widget={widget} />;
      case 'spinner':
        return <SpinnerWidget widget={widget} />;
      case 'cat-meow':
        return <CatMeowWidget widget={widget} />;
      case 'conspiracy':
        return <ConspiracyWidget widget={widget} />;
      case 'fortune-cookie':
        return <FortuneCookieWidget widget={widget} />;
      case 'reverse-typing':
        return <ReverseTypingWidget widget={widget} />;
      case 'useless-stats':
        return <UselessStatsWidget widget={widget} />;
      case 'sandwich-therapist':
        return <SandwichTherapistWidget widget={widget} />;
      case 'time-travel':
        return <TimeTravelWidget widget={widget} />;
      case 'meme-translator':
        return <MemeTranslatorWidget widget={widget} />;
      case 'ai-spirit-animal':
        return <AiSpiritAnimalWidget widget={widget} />;
      case 'reddit-meme-zodiac':
        return <RedditMemeZodiacWidget widget={widget} />;
      case 'explain-meme-ai':
        return <ExplainMemeAiWidget widget={widget} />;
      case 'mini-reddit-reels':
        return <MiniRedditReelsWidget widget={widget} />;
      case 'conspiracy-generator':
        return <ConspiracyGeneratorWidget widget={widget} />;
      case 'chaotic-comment-theater':
        return <ChaoticCommentTheaterWidget widget={widget} />;
      case 'meme-spirit-weapon':
        return <MemeSpiritWeaponWidget widget={widget} />;
      
      // Working new widgets
      case 'emotional-cheese-grater':
        return <EmotionalCheeseGraterWidget widget={widget} />;
      case 'ai-therapist-roaster':
        return <AiTherapistRoasterWidget widget={widget} />;
      case 'interdimensional-todo':
        return <InterdimensionalTodoWidget widget={widget} />;
      case 'out-of-context-quotes':
        return <OutOfContextQuotesWidget widget={widget} />;
      case 'sarcastic-dictionary':
        return <SarcasticDictionaryWidget widget={widget} />;
      case 'time-traveler-diary':
        return <TimeTravelerDiaryWidget widget={widget} />;
      case 'wrong-historical-events':
        return <WrongHistoricalEventsWidget widget={widget} />;
      case 'haunted-calculator':
        return <HauntedCalculatorWidget widget={widget} />;
      case 'pet-rock-mood':
        return <PetRockMoodWidget widget={widget} />;
      case 'ai-dreams':
        return <AiDreamsWidget widget={widget} />;
      case 'internet-apology-generator':
        return <InternetApologyGeneratorWidget widget={widget} />;
      case 'is-it-toasted':
        return <IsItToastedWidget widget={widget} />;
      case 'emotion-number-generator':
        return <EmotionNumberGeneratorWidget widget={widget} />;
      case 'potato-destiny':
        return <PotatoDestinyWidget widget={widget} />;
      case 'dramatic-recipe':
        return <DramaticRecipeWidget widget={widget} />;
      case 'broccoli-life-coach':
        return <BroccoliLifeCoachWidget widget={widget} />;
      case 'honest-mirror':
        return <HonestMirrorWidget widget={widget} />;
      case 'pigeon-sandwich-rater':
        return <PigeonSandwichRaterWidget widget={widget} />;
      case 'life-achievement-unlocked':
        return <LifeAchievementUnlockedWidget widget={widget} />;
      case 'useless-ai-chatbot':
        return <UselessAiChatbotWidget widget={widget} />;
      
      default:
        return <GenericWidget widget={widget} />;
    }
  };

  return (
    <div className="min-h-[500px] max-w-3xl mx-auto bg-black border border-gray-700 rounded-lg p-8 
                    shadow-2xl shadow-white/10 transition-all duration-500">
      {!isLoading && (
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">{widget.title}</h2>
          <div className="w-16 h-px bg-white mx-auto"></div>
        </div>
      )}
      
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        {renderWidget()}
      </div>
    </div>
  );
};