import React from 'react';
import { MousePointer2, Rotate3d, Command } from 'lucide-react';

export const Instructions: React.FC = () => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700/50 pointer-events-none select-none">
      <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">Controls</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-3 text-slate-300 text-sm">
          <MousePointer2 size={16} className="text-blue-400" />
          <span><strong className="text-white">L-Click</strong> to place</span>
        </div>
        <div className="flex items-center gap-3 text-slate-300 text-sm">
          <Command size={16} className="text-red-400" />
          <span><strong className="text-white">Alt + Click</strong> to remove</span>
        </div>
        <div className="flex items-center gap-3 text-slate-300 text-sm">
          <Rotate3d size={16} className="text-emerald-400" />
          <span><strong className="text-white">R-Click + Drag</strong> to rotate</span>
        </div>
      </div>
    </div>
  );
};