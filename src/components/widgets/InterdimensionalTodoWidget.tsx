import React, { useState } from 'react';
import { Widget } from '../../types/reddit';

interface InterdimensionalTodoWidgetProps {
  widget: Widget;
}

const INTERDIMENSIONAL_TASKS = [
  "Convince parallel universe you to stop procrastinating",
  "File taxes in dimension where money doesn't exist",
  "Apologize to the version of you that became successful",
  "Return borrowed items to timeline B-47",
  "Schedule meeting with your evil twin",
  "Update LinkedIn profile across all realities",
  "Explain to dimension C why you chose this career path",
  "Reconcile with the you that made better life choices",
  "Submit expense report for interdimensional travel",
  "Attend therapy session with all your alternate selves",
  "Organize closet in universe where fashion makes sense",
  "Call your mom in the dimension where she's proud of you",
  "Fix the timeline you accidentally broke last Tuesday",
  "Return library books to the reality where you're responsible",
  "Meal prep for the week in dimension where you cook"
];

export const InterdimensionalTodoWidget: React.FC<InterdimensionalTodoWidgetProps> = ({ widget }) => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateTasks = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const shuffled = [...INTERDIMENSIONAL_TASKS].sort(() => Math.random() - 0.5);
      const selectedTasks = shuffled.slice(0, 5);
      setTasks(selectedTasks);
      setCompletedTasks([]);
      setIsGenerating(false);
    }, 2000);
  };

  const completeTask = (task: string) => {
    setTasks(prev => prev.filter(t => t !== task));
    setCompletedTasks(prev => [...prev, task]);
  };

  const reset = () => {
    setTasks([]);
    setCompletedTasks([]);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🌌</div>
        <p className="text-gray-300 text-lg">{widget.content}</p>
        <p className="text-gray-500 text-sm mt-2">
          Tasks from parallel universes where you're more productive
        </p>
      </div>
      
      <div className="text-center">
        <button
          onClick={generateTasks}
          disabled={isGenerating}
          className="px-6 py-3 bg-black border-2 border-white text-white font-mono font-bold
                     hover:bg-white hover:text-black transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'SYNCING ACROSS DIMENSIONS...' : '🌌 GENERATE TODO LIST'}
        </button>
      </div>
      
      {isGenerating && (
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-2">
            <div className="animate-spin text-2xl">🌀</div>
            <div className="animate-pulse text-2xl">📋</div>
            <div className="animate-bounce text-2xl">✨</div>
          </div>
          <p className="text-gray-400 text-sm">
            Accessing task lists from alternate realities...
          </p>
        </div>
      )}
      
      {tasks.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg text-center">Today's Interdimensional Tasks:</h3>
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <div key={index} className="bg-gray-900 p-4 rounded border border-gray-700 flex items-center justify-between">
                <span className="text-gray-300">{task}</span>
                <button
                  onClick={() => completeTask(task)}
                  className="px-3 py-1 bg-green-900 border border-green-700 text-green-300 font-mono text-sm
                             hover:bg-green-800 transition-colors"
                >
                  ✓ Complete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {completedTasks.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-green-400 font-bold text-lg text-center">Completed Across Dimensions:</h3>
          <div className="space-y-2">
            {completedTasks.map((task, index) => (
              <div key={index} className="bg-green-900 p-3 rounded border border-green-700 opacity-75">
                <span className="text-green-300 line-through">{task}</span>
                <span className="text-green-400 ml-2">✓</span>
              </div>
            ))}
          </div>
          
          {completedTasks.length === 5 && (
            <div className="bg-yellow-900 p-4 rounded border border-yellow-700 text-center">
              <p className="text-yellow-300 font-bold">🎉 All tasks completed!</p>
              <p className="text-yellow-200 text-sm mt-1">
                Your alternate selves are proud of you!
              </p>
            </div>
          )}
        </div>
      )}
      
      {(tasks.length > 0 || completedTasks.length > 0) && (
        <div className="text-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-black border border-white text-white font-mono text-sm
                       hover:bg-white hover:text-black transition-all duration-300"
          >
            Reset Dimensions
          </button>
        </div>
      )}
    </div>
  );
};