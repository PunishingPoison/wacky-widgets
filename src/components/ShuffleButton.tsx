import React from 'react';
import { Shuffle } from 'lucide-react';

interface ShuffleButtonProps {
  onShuffle: () => void;
  isLoading: boolean;
}

export const ShuffleButton: React.FC<ShuffleButtonProps> = ({ onShuffle, isLoading }) => {
  return (
    <button
      onClick={onShuffle}
      disabled={isLoading}
      className="group px-8 py-4 bg-black border-2 border-white text-white font-mono font-bold text-lg
                 hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105
                 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                 flex items-center space-x-3"
    >
      <Shuffle 
        className={`w-5 h-5 transition-transform duration-300 ${
          isLoading ? 'animate-spin' : 'group-hover:rotate-180'
        }`} 
      />
      <span>
        {isLoading ? 'SHUFFLING...' : 'SHUFFLE WIDGET'}
      </span>
    </button>
  );
};