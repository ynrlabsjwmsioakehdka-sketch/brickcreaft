import React from 'react';
import { Box, Sparkles, Trash2, Undo2, Redo2, Cuboid } from 'lucide-react';

interface HeaderProps {
  onAIBuilderClick: () => void;
  onClear: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  blockCount: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  onAIBuilderClick, 
  onClear, 
  onUndo, 
  onRedo,
  canUndo,
  canRedo,
  blockCount
}) => {
  return (
    <header className="h-16 px-6 bg-slate-800/80 backdrop-blur-md border-b border-slate-700 flex items-center justify-between z-20">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
          <Cuboid className="text-white" size={24} />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight text-white">BrickCraft</h1>
          <span className="text-xs text-slate-400 font-mono">{blockCount} BLOCKS</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center bg-slate-700/50 rounded-lg p-1 mr-4 border border-slate-600/50">
          <button 
            onClick={onUndo}
            disabled={!canUndo}
            className={`p-2 rounded-md transition-colors ${canUndo ? 'hover:bg-slate-600 text-slate-200' : 'text-slate-600 cursor-not-allowed'}`}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 size={18} />
          </button>
          <button 
            onClick={onRedo}
            disabled={!canRedo}
            className={`p-2 rounded-md transition-colors ${canRedo ? 'hover:bg-slate-600 text-slate-200' : 'text-slate-600 cursor-not-allowed'}`}
            title="Redo (Ctrl+Y)"
          >
            <Redo2 size={18} />
          </button>
        </div>

        <button 
          onClick={onClear}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors font-medium text-sm border border-transparent hover:border-red-500/20"
        >
          <Trash2 size={16} />
          <span>Clear</span>
        </button>

        <button 
          onClick={onAIBuilderClick}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-lg shadow-lg shadow-blue-600/25 transition-all transform hover:scale-105 font-medium text-sm"
        >
          <Sparkles size={16} />
          <span>AI Build</span>
        </button>
      </div>
    </header>
  );
};