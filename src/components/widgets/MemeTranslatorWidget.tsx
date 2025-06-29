import React, { useState } from 'react';
import { Widget } from '../../types/reddit';

interface MemeTranslatorWidgetProps {
  widget: Widget;
}

const MEME_TRANSLATIONS: { [key: string]: string } = {
  'when your cpu overheats': 'The processor experiences thermal distress, resulting in suboptimal computational performance.',
  'me trying to fix a bug': 'An individual attempting to rectify a software anomaly through systematic debugging procedures.',
  'it works on my machine': 'The software functions correctly within my local development environment.',
  'stackoverflow saved my life': 'The collaborative programming platform provided essential technical assistance.',
  'when the code finally works': 'Upon successful execution of the programming logic after extensive troubleshooting.',
  'undefined is not a function': 'The referenced variable lacks the expected functional properties.',
  'git commit -m "fix"': 'A version control submission with minimal descriptive documentation.',
  'when you forget a semicolon': 'The omission of required punctuation in programming syntax.',
  'production vs development': 'The disparity between live deployment and local testing environments.',
  'when the intern touches production': 'An inexperienced team member inadvertently modifies the live system.'
};

export const MemeTranslatorWidget: React.FC<MemeTranslatorWidgetProps> = ({ widget }) => {
  const [translation, setTranslation] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  const translateMeme = () => {
    setIsTranslating(true);
    setTranslation('');
    
    setTimeout(() => {
      const memeText = widget.content.toLowerCase();
      let result = '';
      
      // Check for known translations
      for (const [key, value] of Object.entries(MEME_TRANSLATIONS)) {
        if (memeText.includes(key)) {
          result = value;
          break;
        }
      }
      
      // Fallback generic translation
      if (!result) {
        result = `This humorous internet content expresses a relatable sentiment regarding digital experiences and technological interactions in contemporary society.`;
      }
      
      setTranslation(result);
      setIsTranslating(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🎭</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
      </div>
      
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">😂</div>
          <div>
            <h3 className="text-white font-bold mb-2">Original Meme:</h3>
            <p className="text-gray-300 text-lg">
              {widget.data ? widget.data.title : widget.content}
            </p>
          </div>
        </div>
      </div>
      
      <button
        onClick={translateMeme}
        disabled={isTranslating}
        className="w-full px-6 py-3 bg-black border-2 border-white text-white font-mono font-bold
                   hover:bg-white hover:text-black transition-all duration-300
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
      >
        {isTranslating ? 'TRANSLATING TO FORMAL ENGLISH...' : 'TRANSLATE TO SOPHISTICATED DISCOURSE'}
      </button>
      
      {isTranslating && (
        <div className="text-center">
          <div className="animate-spin text-4xl mb-2">🎩</div>
          <p className="text-gray-400 text-sm">
            Converting internet chaos into refined language...
          </p>
        </div>
      )}
      
      {translation && !isTranslating && (
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">🎩</div>
            <div>
              <h3 className="text-white font-bold mb-2">Formal Translation:</h3>
              <p className="text-gray-300 text-lg leading-relaxed italic">
                "{translation}"
              </p>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-gray-500 text-sm">
                  - Professor Internet, Department of Digital Linguistics
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};