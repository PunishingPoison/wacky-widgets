import React from 'react';
import { Widget } from '../../types/reddit';

interface ShowerthoughtWidgetProps {
  widget: Widget;
}

export const ShowerthoughtWidget: React.FC<ShowerthoughtWidgetProps> = ({ widget }) => {
  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute -top-2 -left-2 text-4xl">💭</div>
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 ml-8">
          <p className="text-gray-100 text-lg leading-relaxed font-medium">
            "{widget.content}"
          </p>
        </div>
      </div>
      {widget.data && (
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Brought to you by u/{widget.data.author} • {widget.data.ups} upvotes
          </p>
        </div>
      )}
    </div>
  );
};