import React from 'react';
import { DEFAULT_COLORS } from '../constants';
import { Palette } from 'lucide-react';

interface ToolbarProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ selectedColor, onColorSelect }) => {
  return (
    <div className="bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-700 max-h-[80vh] overflow-y-auto scrollbar-hide">
      <div className="flex items-center gap-2 mb-4 text-slate-300">
        <Palette size={20} />
        <span className="font-semibold text-sm uppercase tracking-wider">Palette</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {DEFAULT_COLORS.map((c) => (
          <button
            key={c.value}
            onClick={() => onColorSelect(c.value)}
            className={`
              w-10 h-10 rounded-lg transition-all duration-200 border-2
              hover:scale-110 focus:outline-none
              ${selectedColor === c.value 
                ? 'border-white shadow-lg scale-110 ring-2 ring-blue-500/50' 
                : 'border-transparent hover:border-slate-500'}
            `}
            style={{ backgroundColor: c.value }}
            title={c.name}
            aria-label={`Select color ${c.name}`}
          />
        ))}
      </div>
    </div>
  );
};