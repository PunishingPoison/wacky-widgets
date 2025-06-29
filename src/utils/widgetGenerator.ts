import { Widget, RedditPost, WidgetType } from '../types/reddit';

const STANDALONE_WIDGETS: Array<{ type: WidgetType; title: string; content: string }> = [
  // Original widgets
  {
    type: 'click-counter',
    title: 'The Absolutely Pointless Click Counter',
    content: 'Click me and watch numbers go up for no reason whatsoever!'
  },
  {
    type: 'spinner',
    title: 'The Maybe Machine',
    content: 'Spin to get a definitely maybe answer to life\'s questions!'
  },
  {
    type: 'cat-meow',
    title: 'Digital Cat Simulator',
    content: 'Hover over me to hear my majestic meow! (Warning: No actual sound)'
  },
  {
    type: 'fortune-cookie',
    title: '404 Fortune Cookie',
    content: 'Click the cookie for wisdom that doesn\'t exist!'
  },
  {
    type: 'reverse-typing',
    title: 'Reverse Typing Challenge',
    content: 'Type this phrase backwards. Because why not?'
  },
  {
    type: 'useless-stats',
    title: 'Useless Life Statistics',
    content: 'Tracking the metrics that absolutely don\'t matter!'
  },
  {
    type: 'sandwich-therapist',
    title: 'AI Therapist for Sandwiches',
    content: 'What kind of sandwich are you today? Let\'s explore your inner bread.'
  },
  {
    type: 'time-travel',
    title: 'Time Travel Calculator',
    content: 'Discover which historical era your soul belongs to!'
  },
  {
    type: 'meme-translator',
    title: 'Meme to Formal English Translator',
    content: 'Converting internet chaos into sophisticated discourse!'
  },
  {
    type: 'ai-spirit-animal',
    title: 'AI Spirit Animal Generator',
    content: 'Rate your current energy level and discover your inner chaos creature!'
  },
  {
    type: 'reddit-meme-zodiac',
    title: 'Reddit Meme Zodiac',
    content: 'Choose your vibe and receive your daily meme horoscope!'
  },
  {
    type: 'explain-meme-ai',
    title: 'Explain This Meme, AI!',
    content: 'Academic analysis of internet chaos for your intellectual pleasure.'
  },
  {
    type: 'mini-reddit-reels',
    title: 'Mini Reddit Reels Player',
    content: 'Vertical drama simulator - because we need more chaos in our lives!'
  },
  {
    type: 'conspiracy-generator',
    title: 'Daily Random Conspiracy Generator',
    content: 'Fresh conspiracies delivered straight to your brain!'
  },
  {
    type: 'chaotic-comment-theater',
    title: 'Chaotic Comment Theater',
    content: 'Watch strangers argue about meaningless topics!'
  },
  {
    type: 'meme-spirit-weapon',
    title: 'Your Meme Spirit Weapon',
    content: 'Choose your battle mood and receive your weapon of mass confusion!'
  },
  
  // Working new widgets
  {
    type: 'emotional-cheese-grater',
    title: 'Emotional Cheese Grater',
    content: 'Grate your feelings into tiny, manageable pieces!'
  },
  {
    type: 'ai-therapist-roaster',
    title: 'AI Therapist That Roasts You',
    content: 'Get therapy, but make it savage. Your problems deserve better insults.'
  },
  {
    type: 'interdimensional-todo',
    title: 'Interdimensional To-Do List',
    content: 'Tasks from parallel universes where you\'re more productive!'
  },
  {
    type: 'out-of-context-quotes',
    title: 'Out-of-Context Movie Quote Generator',
    content: 'Famous movie lines that make no sense here!'
  },
  {
    type: 'sarcastic-dictionary',
    title: 'The Sarcastic Dictionary',
    content: 'Word definitions, but with maximum attitude!'
  },
  {
    type: 'time-traveler-diary',
    title: 'Time Traveler\'s Mood Diary',
    content: 'Emotional entries from across the timeline!'
  },
  {
    type: 'wrong-historical-events',
    title: 'Random Historical Event, But Wrong',
    content: 'History lessons from an alternate reality!'
  },
  {
    type: 'haunted-calculator',
    title: 'Haunted Calculator',
    content: 'Math, but cursed. The numbers don\'t add up... literally!'
  },
  {
    type: 'pet-rock-mood',
    title: 'The Pet Rock\'s Daily Mood',
    content: 'Your rock has feelings. Deep, geological feelings.'
  },
  {
    type: 'ai-dreams',
    title: 'Totally Real AI Dreams',
    content: 'What artificial intelligence dreams about when it sleeps!'
  },
  {
    type: 'internet-apology-generator',
    title: 'Random Internet Apology Generator',
    content: 'Sorry for things you didn\'t even know you did wrong!'
  },
  {
    type: 'is-it-toasted',
    title: '"Is It Toasted?" Widget',
    content: 'Evaluating random objects for their toastiness level!'
  },
  {
    type: 'emotion-number-generator',
    title: 'Emotion-Driven Random Number Generator',
    content: 'Numbers based on your current emotional state!'
  },
  {
    type: 'potato-destiny',
    title: 'Potato of Destiny',
    content: 'Click the sacred potato to learn your starchy fate!'
  },
  {
    type: 'dramatic-recipe',
    title: 'Overly Dramatic Recipe Widget',
    content: 'Cooking instructions with unnecessary emotional intensity!'
  },
  {
    type: 'broccoli-life-coach',
    title: 'Broccoli Life Coach',
    content: 'Nutritional wisdom meets questionable life advice!'
  },
  {
    type: 'honest-mirror',
    title: 'Alarmingly Honest Mirror Widget',
    content: 'Reflections that tell you what you need to hear!'
  },
  {
    type: 'pigeon-sandwich-rater',
    title: 'Pigeon That Rates Sandwiches',
    content: 'Professional sandwich criticism from a bird brain!'
  },
  {
    type: 'life-achievement-unlocked',
    title: 'Random Life Achievement Unlocked!',
    content: 'Celebrating your most mundane accomplishments!'
  },
  {
    type: 'useless-ai-chatbot',
    title: 'Absolutely Useless AI Chatbot',
    content: 'Chat with an AI that specializes in being completely unhelpful!'
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

const TIME_TRAVEL_ERAS = [
  "a bread farmer in 13th century Iceland",
  "a confused philosopher in ancient Greece",
  "a court jester in medieval England",
  "a tea merchant in 18th century China",
  "a lighthouse keeper in 1800s Maine",
  "a telegraph operator in the Wild West",
  "a jazz musician in 1920s New Orleans",
  "a radio announcer in 1940s New York",
  "a beatnik poet in 1950s San Francisco",
  "a disco dancer in 1970s Studio 54"
];

const SANDWICH_RESPONSES = [
  "As a turkey melt, your inner strength is hidden beneath layers.",
  "Grilled cheese? Emotionally toasted but still gooey inside.",
  "A BLT represents your desire for balance in chaos.",
  "Peanut butter and jelly - you're sweet but stuck together.",
  "Club sandwich? You're complex and have trust issues.",
  "Subway sandwich means you're practical but lack imagination.",
  "A panini suggests you're under pressure but handling it well.",
  "Tuna salad indicates you're fishy about your true feelings."
];

const SPIRIT_ANIMALS = [
  { animal: "Hyperactive Raccoon", emoji: "🦝", motto: "Steal snacks. Panic later." },
  { animal: "Existential Crisis Cat", emoji: "😿", motto: "Meow into the void. The void meows back." },
  { animal: "Caffeinated Squirrel", emoji: "🐿️", motto: "Collect nuts. Question everything." },
  { animal: "Procrastinating Sloth", emoji: "🦥", motto: "Why do today what you can do... eventually?" },
  { animal: "Chaotic Goose", emoji: "🪿", motto: "Honk first. Ask questions never." },
  { animal: "Overthinking Owl", emoji: "🦉", motto: "Hoot about it for 3 hours minimum." },
  { animal: "Dramatic Llama", emoji: "🦙", motto: "Spit first. Apologize dramatically." },
  { animal: "Anxious Hamster", emoji: "🐹", motto: "Run in circles. Achieve nothing. Repeat." }
];

const MEME_HOROSCOPES = [
  "As a sleepy goblin, you will vibe with this chaos today.",
  "Your chaotic energy aligns with maximum confusion this week.",
  "The stars say you're dead inside, but in a fun way.",
  "Mercury is in microwave, expect technical difficulties.",
  "Your hopeful delusion will be tested by reality today.",
  "The universe suggests touching grass, but we both know you won't.",
  "Your main character energy is showing. Tone it down.",
  "Today's vibe: Unhinged but make it aesthetic."
];

const FAKE_CONSPIRACIES = [
  "Bats invented Wi-Fi to spy on our Netflix habits",
  "The moon is a hologram run by cats seeking world domination",
  "Pigeons are government drones that forgot their programming",
  "Socks disappear in the dryer to fuel an alternate dimension",
  "Trees are actually antennas for alien communication networks",
  "Your phone's autocorrect is controlled by your ex",
  "Rubber ducks are surveillance devices for bathroom activities",
  "Pizza delivery drivers are secret agents mapping our homes"
];

const REDDIT_DRAMA_CLIPS = [
  {
    title: "AITA for eating my roommate's yogurt?",
    drama: "Plot twist: It wasn't yogurt. It was face cream. 🤢",
    reactions: ["💀", "😭", "🤡", "💀", "😱"]
  },
  {
    title: "My neighbor keeps stealing my packages",
    drama: "Update: Turns out it was my own mother. Family dinner was awkward. 👵",
    reactions: ["😂", "💀", "🤦", "😭", "🫠"]
  },
  {
    title: "Found out my cat has been living a double life",
    drama: "He has another family three blocks away. They call him 'Mr. Whiskers.' 🐱",
    reactions: ["😹", "💔", "🤯", "😭", "🐱"]
  },
  {
    title: "My boss asked me to work on my day off",
    drama: "I said I was busy. I was busy playing Solitaire. No regrets. 🃏",
    reactions: ["👑", "💪", "😎", "🔥", "💯"]
  }
];

const COMMENT_ARGUMENTS = [
  {
    topic: "Pineapple on Pizza",
    comments: [
      { user: "PizzaPurist2024", text: "Pineapple on pizza is a crime against humanity", reactions: "😤" },
      { user: "TropicalVibes", text: "Hawaiian pizza is literally named after a place. Checkmate.", reactions: "🏝️" },
      { user: "ItalianNonna", text: "My ancestors are crying in marinara sauce", reactions: "😭" },
      { user: "ChaosMaster", text: "I put pineapple on everything. Fight me.", reactions: "🥊" }
    ]
  },
  {
    topic: "Cereal is Soup",
    comments: [
      { user: "PhilosophyBro", text: "Cereal is cold soup. This is not debatable.", reactions: "🧠" },
      { user: "BreakfastDefender", text: "Soup requires cooking. Cereal is just... wet.", reactions: "💧" },
      { user: "ChaosTheory101", text: "If cereal is soup, then hot dogs are sandwiches", reactions: "🌭" },
      { user: "ExistentialCrisis", text: "Nothing matters. We're all just floating in milk.", reactions: "🥛" }
    ]
  }
];

const SPIRIT_WEAPONS = [
  { weapon: "Slipper of Doom", emoji: "🩴", power: "Devastating accuracy and maternal energy" },
  { weapon: "Rubber Chicken of Chaos", emoji: "🐔", power: "Confuses enemies with squeaky sounds" },
  { weapon: "Spoon of Infinite Stirring", emoji: "🥄", power: "Creates whirlpools of confusion" },
  { weapon: "Pillow of Eternal Naps", emoji: "🛏️", power: "Puts enemies to sleep permanently" },
  { weapon: "Banana of Mass Distraction", emoji: "🍌", power: "Causes slip-based chaos" },
  { weapon: "Keyboard of Passive Aggression", emoji: "⌨️", power: "Types sarcastic comments automatically" },
  { weapon: "Coffee Mug of Infinite Caffeine", emoji: "☕", power: "Grants hyperactive energy bursts" },
  { weapon: "Sock of Single Existence", emoji: "🧦", power: "Makes enemies lose their pairs" }
];

export const generateWidget = (post?: RedditPost | null): Widget => {
  // Much higher chance for standalone widgets now (90%)
  if (!post || Math.random() < 0.9) {
    const standaloneWidget = STANDALONE_WIDGETS[Math.floor(Math.random() * STANDALONE_WIDGETS.length)];
    
    // Add special content for certain widget types
    let content = standaloneWidget.content;
    if (standaloneWidget.type === 'reverse-typing') {
      const phrases = [
        "The quick brown fox jumps",
        "Reality is often disappointing",
        "This sentence is backwards",
        "Confusion is the beginning of wisdom",
        "Why are you doing this",
        "Backwards typing makes no sense"
      ];
      content = phrases[Math.floor(Math.random() * phrases.length)];
    }
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...standaloneWidget,
      content
    };
  }

  // Generate widget based on subreddit (10% chance)
  const subreddit = post.subreddit.toLowerCase();
  let widgetType: WidgetType;
  let title: string;
  let content: string;

  switch (subreddit) {
    case 'showerthoughts':
      widgetType = Math.random() < 0.5 ? 'showerthought' : 'floating-bubble';
      title = widgetType === 'floating-bubble' ? '💭 Floating Shower Thought' : '🚿 Shower Thought of the Moment';
      content = post.title;
      break;
    case 'conspiracy':
      widgetType = Math.random() < 0.5 ? 'conspiracy' : 'conspiracy-generator';
      title = widgetType === 'conspiracy-generator' ? '🕵️ Conspiracy Generator' : '🕵️ Today\'s Conspiracy Theory';
      content = post.title;
      break;
    case 'programmerhumor':
      widgetType = Math.random() < 0.5 ? 'programmer-humor' : 'explain-meme-ai';
      title = widgetType === 'explain-meme-ai' ? '🎓 Explain This Meme, AI!' : '💻 Programmer Humor Alert';
      content = post.title;
      break;
    case 'memes':
      const memeWidgets: WidgetType[] = ['meme-translator', 'reddit-meme-zodiac', 'explain-meme-ai'];
      widgetType = memeWidgets[Math.floor(Math.random() * memeWidgets.length)];
      title = widgetType === 'meme-translator' ? '🎭 Meme Translation Service' : 
              widgetType === 'reddit-meme-zodiac' ? '🔮 Reddit Meme Zodiac' : '🎓 Explain This Meme, AI!';
      content = post.title;
      break;
    case 'catsareliquid':
      widgetType = 'cat-meow';
      title = '🐱 Liquid Cat Simulator';
      content = 'This cat is definitely liquid. Hover to confirm.';
      break;
    case 'confusing_perspective':
      widgetType = 'reverse-typing';
      title = '🔄 Perspective Reversal Challenge';
      content = post.title.length > 50 ? post.title.substring(0, 50) : post.title;
      break;
    case 'todayilearned':
      widgetType = 'fact';
      title = '🧠 Mind-Blowing Fact';
      content = post.title.replace(/^TIL\s*/i, '');
      break;
    case 'nostupidquestions':
      widgetType = 'question';
      title = '❓ Someone Actually Asked This';
      content = post.title;
      break;
    default:
      widgetType = 'fact';
      title = '🔍 Random Reddit Discovery';
      content = post.title;
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    type: widgetType,
    title,
    content,
    data: post
  };
};

export { 
  FORTUNE_MESSAGES, 
  TIME_TRAVEL_ERAS, 
  SANDWICH_RESPONSES, 
  SPIRIT_ANIMALS, 
  MEME_HOROSCOPES, 
  FAKE_CONSPIRACIES, 
  REDDIT_DRAMA_CLIPS, 
  COMMENT_ARGUMENTS, 
  SPIRIT_WEAPONS 
};