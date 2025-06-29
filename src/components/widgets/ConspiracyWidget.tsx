import React from 'react';
import { Widget } from '../../types/reddit';

interface ConspiracyWidgetProps {
  widget: Widget;
}

export const ConspiracyWidget: React.FC<ConspiracyWidgetProps> = ({ widget }) => {
  return (
    <div className="space-y-6">
      <div className="relative bg-gray-900 p-6 rounded-lg border border-red-900 border-dashed">
        <div className="absolute -top-3 -right-3 text-2xl">🕵️</div>
        <div className="flex items-start space-x-3">
          <div className="text-red-500 text-xl">⚠️</div>
          <div>
            <p className="text-red-100 text-lg leading-relaxed">
              {widget.content}
            </p>
          </div>
        </div>
      </div>
      
      {widget.data && (
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Conspiracy level: {widget.data.ups > 1000 ? 'VERY SUSPICIOUS' : 'MILDLY CONCERNING'}
          </p>
          <p className="text-gray-500 text-xs">
            Shared by u/{widget.data.author}
          </p>
        </div>
      )}
      
      <div className="text-center">
        <p className="text-gray-600 text-xs italic">
          Disclaimer: This is from Reddit. Take with a grain of salt... or don't. 👀
        </p>
      </div>
    </div>
  );
};