import { useState, useCallback } from 'react';
import { RedditResponse, RedditPost } from '../types/reddit';

const SUBREDDITS = [
  'Showerthoughts',
  'conspiracy', 
  'ProgrammerHumor',
  'todayilearned',
  'NoStupidQuestions',
  'memes',
  'catsareliquid',
  'confusing_perspective'
];

export const useRedditData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomPost = useCallback(async (): Promise<RedditPost | null> => {
    setLoading(true);
    setError(null);

    try {
      const randomSubreddit = SUBREDDITS[Math.floor(Math.random() * SUBREDDITS.length)];
      const response = await fetch(
        `https://www.reddit.com/r/${randomSubreddit}/hot.json?limit=25`,
        {
          headers: {
            'User-Agent': 'WackyWidgets/2.0'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch Reddit data');
      }

      const data: RedditResponse = await response.json();
      const posts = data.data.children
        .map(child => child.data)
        .filter(post => !post.url.includes('reddit.com/r/') && post.selftext !== '[removed]');

      if (posts.length === 0) {
        throw new Error('No valid posts found');
      }

      const randomPost = posts[Math.floor(Math.random() * posts.length)];
      return randomPost;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchRandomPost, loading, error };
};