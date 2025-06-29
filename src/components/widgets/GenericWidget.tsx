import React from 'react';
import { Widget } from '../../types/reddit';

interface GenericWidgetProps {
  widget: Widget;
}

export const GenericWidget: React.FC<GenericWidgetProps> = ({ widget }) => {
  const getIcon = () => {
    switch (widget.type) {
      case 'programmer-humor': return '💻';
      case 'fact': return '🧠';
      case 'question': return '❓';
      default: return '🔍';
    }
  };

  const getBorderColor = () => {
    switch (widget.type) {
      case 'programmer-humor': return 'border-green-700';
      case 'fact': return 'border-blue-700';
      case 'question': return 'border-yellow-700';
      default: return 'border-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className={`bg-gray-900 p-6 rounded-lg border ${getBorderColor()}`}>
        <div className="flex items-start space-x-3">
          <div className="text-2xl">{getIcon()}</div>
          <div>
            <p className="text-gray-100 text-lg leading-relaxed">
              {widget.content}
            </p>
          </div>
        </div>
      </div>
      
      {widget.data && (
        <div className="text-center space-y-1">
          <p className="text-gray-400 text-sm">
            From r/{widget.data.subreddit} • {widget.data.ups} upvotes
          </p>
          <p className="text-gray-500 text-xs">
            By u/{widget.data.author}
          </p>
        </div>
      )}
    </div>
  );
};