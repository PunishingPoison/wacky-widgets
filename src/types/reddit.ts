export interface RedditPost {
  id: string;
  title: string;
  selftext: string;
  url: string;
  subreddit: string;
  author: string;
  ups: number;
  created_utc: number;
  is_self: boolean;
}

export interface RedditResponse {
  data: {
    children: Array<{
      data: RedditPost;
    }>;
  };
}

export type WidgetType = 
  | 'showerthought' 
  | 'conspiracy' 
  | 'programmer-humor' 
  | 'fact' 
  | 'question' 
  | 'click-counter' 
  | 'spinner' 
  | 'cat-meow'
  | 'fortune-cookie'
  | 'reverse-typing'
  | 'useless-stats'
  | 'meme-translator'
  | 'sandwich-therapist'
  | 'time-travel'
  | 'floating-bubble'
  | 'ai-spirit-animal'
  | 'reddit-meme-zodiac'
  | 'explain-meme-ai'
  | 'mini-reddit-reels'
  | 'conspiracy-generator'
  | 'chaotic-comment-theater'
  | 'meme-spirit-weapon'
  | 'emotional-cheese-grater'
  | 'ai-therapist-roaster'
  | 'interdimensional-todo'
  | 'out-of-context-quotes'
  | 'sarcastic-dictionary'
  | 'time-traveler-diary'
  | 'wrong-historical-events'
  | 'haunted-calculator'
  | 'pet-rock-mood'
  | 'ai-dreams'
  | 'internet-apology-generator'
  | 'is-it-toasted'
  | 'emotion-number-generator'
  | 'potato-destiny'
  | 'dramatic-recipe'
  | 'broccoli-life-coach'
  | 'honest-mirror'
  | 'pigeon-sandwich-rater'
  | 'life-achievement-unlocked'
  | 'useless-ai-chatbot';

export interface Widget {
  id: string;
  type: WidgetType;
  title: string;
  content: string;
  data?: RedditPost;
}