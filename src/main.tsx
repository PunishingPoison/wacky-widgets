import { Devvit, useState } from '@devvit/public-api';

// Configure the app
Devvit.configure({
  redditAPI: true,
  redis: true,
});

// Widget data structure
interface Widget {
  id: string;
  type: string;
  title: string;
  content: string;
}

// Available widgets (simplified for Reddit)
const REDDIT_WIDGETS = [
  {
    type: 'click-counter',
    title: '🔢 Pointless Click Counter',
    content: 'Click me and watch numbers go up for absolutely no reason!'
  },
  {
    type: 'fortune-cookie',
    title: '🥠 404 Fortune Cookie',
    content: 'Click for wisdom that doesn\'t exist!'
  },
  {
    type: 'emotional-cheese-grater',
    title: '🧀 Emotional Cheese Grater',
    content: 'Grate your feelings into tiny, manageable pieces!'
  },
  {
    type: 'potato-destiny',
    title: '🥔 Potato of Destiny',
    content: 'Click the sacred potato to learn your starchy fate!'
  },
  {
    type: 'ai-therapist-roaster',
    title: '🤖 AI Therapist That Roasts You',
    content: 'Get therapy, but make it savage!'
  },
  {
    type: 'broccoli-life-coach',
    title: '🥦 Broccoli Life Coach',
    content: 'Nutritional wisdom meets questionable life advice!'
  },
  {
    type: 'honest-mirror',
    title: '🪞 Alarmingly Honest Mirror',
    content: 'Reflections that tell you what you need to hear!'
  },
  {
    type: 'pigeon-sandwich-rater',
    title: '🐦 Pigeon Sandwich Critic',
    content: 'Professional sandwich criticism from a bird brain!'
  }
];

const FORTUNE_MESSAGES = [
  "You will forget why you came here.",
  "404 future not found.",
  "Today is not your day. Try again tomorrow.",
  "Your destiny is loading... please wait.",
  "Error: Motivation not found.",
  "You are exactly where you need to be: confused.",
  "The answer you seek is in another widget.",
  "Congratulations! You've wasted 3.7 seconds.",
  "Your future is as unclear as this message.",
  "Warning: Existential crisis detected."
];

const POTATO_DESTINIES = [
  "French Fry Royalty - You are destined to become the most perfectly crispy french fry!",
  "Mashed Potato Zen Master - Your future lies in achieving perfect creamy texture!",
  "Baked Potato Philosopher - You will contemplate the meaning of toppings!",
  "Sweet Potato Influencer - Your orange glow will inspire millions!",
  "Hash Brown Hero - You will save breakfast from blandness!"
];

const ROAST_THERAPY = [
  "Let's unpack this... Actually, let's just throw the whole suitcase away. Your problems have problems.",
  "Your emotional baggage is so heavy, airlines would charge you extra fees just for existing.",
  "You're not broken, you're just... aggressively unique in all the wrong ways.",
  "Your life choices suggest you use a magic 8-ball for major decisions.",
  "Your emotional intelligence is running on Internet Explorer while everyone else has upgraded."
];

// Main app component
const App: Devvit.CustomPostComponent = (context) => {
  const [currentWidget, setCurrentWidget] = useState<Widget | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [widgetData, setWidgetData] = useState<any>({});

  const generateRandomWidget = () => {
    const randomWidget = REDDIT_WIDGETS[Math.floor(Math.random() * REDDIT_WIDGETS.length)];
    const widget: Widget = {
      id: Math.random().toString(36).substr(2, 9),
      type: randomWidget.type,
      title: randomWidget.title,
      content: randomWidget.content
    };
    setCurrentWidget(widget);
    setWidgetData({});
  };

  const handleWidgetInteraction = (widgetType: string) => {
    switch (widgetType) {
      case 'click-counter':
        setClickCount(prev => prev + 1);
        break;
      case 'fortune-cookie':
        const fortune = FORTUNE_MESSAGES[Math.floor(Math.random() * FORTUNE_MESSAGES.length)];
        setWidgetData({ fortune });
        break;
      case 'potato-destiny':
        const destiny = POTATO_DESTINIES[Math.floor(Math.random() * POTATO_DESTINIES.length)];
        setWidgetData({ destiny });
        break;
      case 'ai-therapist-roaster':
        const roast = ROAST_THERAPY[Math.floor(Math.random() * ROAST_THERAPY.length)];
        setWidgetData({ roast });
        break;
      default:
        setWidgetData({ message: "Widget activated! Check out the full experience at wacky-widgets.netlify.app" });
    }
  };

  const renderWidget = () => {
    if (!currentWidget) {
      return (
        <vstack alignment="center" padding="large" gap="medium">
          <text size="xxlarge">🎲</text>
          <text size="large" weight="bold">WackyWidgets for Reddit</text>
          <text size="medium" color="neutral-content-weak">
            37 pointless but entertaining widgets!
          </text>
          <button onPress={generateRandomWidget} appearance="primary" size="large">
            🎯 Generate Random Widget
          </button>
          <text size="small" color="neutral-content-weak">
            Full experience: wacky-widgets.netlify.app
          </text>
        </vstack>
      );
    }

    return (
      <vstack padding="large" gap="medium">
        <vstack alignment="center" gap="small">
          <text size="large" weight="bold">{currentWidget.title}</text>
          <text size="medium" color="neutral-content-weak">{currentWidget.content}</text>
        </vstack>

        {/* Widget-specific content */}
        {currentWidget.type === 'click-counter' && (
          <vstack alignment="center" gap="medium">
            <text size="xxlarge" weight="bold">{clickCount}</text>
            <button 
              onPress={() => handleWidgetInteraction('click-counter')} 
              appearance="primary"
            >
              CLICK ME
            </button>
            {clickCount > 0 && (
              <text size="small" color="neutral-content-weak">
                Congratulations! You've wasted {clickCount} click{clickCount !== 1 ? 's' : ''} of your life.
              </text>
            )}
          </vstack>
        )}

        {currentWidget.type === 'fortune-cookie' && (
          <vstack alignment="center" gap="medium">
            <text size="xxlarge">🥠</text>
            <button 
              onPress={() => handleWidgetInteraction('fortune-cookie')} 
              appearance="primary"
            >
              Crack Open Cookie
            </button>
            {widgetData.fortune && (
              <vstack alignment="center" gap="small" padding="medium" 
                     backgroundColor="neutral-background-weak" cornerRadius="medium">
                <text size="medium" weight="bold">Your Fortune:</text>
                <text size="medium" style="italic">"{widgetData.fortune}"</text>
              </vstack>
            )}
          </vstack>
        )}

        {currentWidget.type === 'potato-destiny' && (
          <vstack alignment="center" gap="medium">
            <text size="xxlarge">🥔</text>
            <button 
              onPress={() => handleWidgetInteraction('potato-destiny')} 
              appearance="primary"
            >
              Consult Sacred Potato
            </button>
            {widgetData.destiny && (
              <vstack alignment="center" gap="small" padding="medium" 
                     backgroundColor="neutral-background-weak" cornerRadius="medium">
                <text size="medium" weight="bold">Your Starchy Destiny:</text>
                <text size="medium">{widgetData.destiny}</text>
              </vstack>
            )}
          </vstack>
        )}

        {currentWidget.type === 'ai-therapist-roaster' && (
          <vstack alignment="center" gap="medium">
            <text size="xxlarge">🤖</text>
            <button 
              onPress={() => handleWidgetInteraction('ai-therapist-roaster')} 
              appearance="primary"
            >
              Get Roasted by AI
            </button>
            {widgetData.roast && (
              <vstack alignment="center" gap="small" padding="medium" 
                     backgroundColor="red-background" cornerRadius="medium">
                <text size="medium" weight="bold" color="red">Dr. Savage's Analysis:</text>
                <text size="medium" color="red">"{widgetData.roast}"</text>
              </vstack>
            )}
          </vstack>
        )}

        {/* Generic widget display */}
        {!['click-counter', 'fortune-cookie', 'potato-destiny', 'ai-therapist-roaster'].includes(currentWidget.type) && (
          <vstack alignment="center" gap="medium">
            <text size="xxlarge">🎭</text>
            <button 
              onPress={() => handleWidgetInteraction(currentWidget.type)} 
              appearance="primary"
            >
              Activate Widget
            </button>
            {widgetData.message && (
              <vstack alignment="center" gap="small" padding="medium" 
                     backgroundColor="neutral-background-weak" cornerRadius="medium">
                <text size="medium">{widgetData.message}</text>
              </vstack>
            )}
          </vstack>
        )}

        {/* Action buttons */}
        <hstack gap="medium" alignment="center">
          <button onPress={generateRandomWidget} appearance="secondary">
            🎲 New Widget
          </button>
          <button 
            onPress={() => {
              context.ui.navigateToUrl('https://wacky-widgets.netlify.app');
            }}
            appearance="bordered"
          >
            🌐 Full Experience
          </button>
        </hstack>

        <text size="small" color="neutral-content-weak" alignment="center">
          Made by V C Mohit Rao • Powered by Bolt.new
        </text>
      </vstack>
    );
  };

  return renderWidget();
};

// Menu action to create a new WackyWidget post
const createWidgetPost = Devvit.addMenuItem({
  label: '🎲 Create WackyWidget Post',
  location: 'subreddit',
  onPress: async (_, context) => {
    const { reddit, ui } = context;
    
    try {
      const subreddit = await reddit.getCurrentSubreddit();
      const randomWidget = REDDIT_WIDGETS[Math.floor(Math.random() * REDDIT_WIDGETS.length)];
      
      const post = await reddit.submitPost({
        title: `🎭 ${randomWidget.title} - Interactive Widget!`,
        subredditName: subreddit.name,
        preview: (
          <vstack alignment="center" padding="large" gap="medium">
            <text size="large" weight="bold">{randomWidget.title}</text>
            <text size="medium">{randomWidget.content}</text>
            <text size="small" color="neutral-content-weak">
              Click to interact with this widget!
            </text>
          </vstack>
        ),
      });
      
      ui.showToast({
        text: `Created ${randomWidget.title} widget post!`,
        appearance: 'success',
      });
      
      ui.navigateToPost(post.id);
    } catch (error) {
      ui.showToast({
        text: 'Failed to create widget post',
        appearance: 'neutral',
      });
    }
  },
});

// Register the custom post type
Devvit.addCustomPostType({
  name: 'WackyWidget',
  height: 'tall',
  render: App,
});

export default Devvit;