import React, { useState } from 'react';
import { X, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { generateLegoStructure } from '../services/geminiService';
import { BlockData } from '../types';
import { nanoid } from 'nanoid';

interface AIBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuild: (blocks: BlockData[]) => void;
}

export const AIBuilderModal: React.FC<AIBuilderModalProps> = ({ isOpen, onClose, onBuild }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const rawBlocks = await generateLegoStructure(prompt);
      
      // Transform AI response to internal BlockData format
      const formattedBlocks: BlockData[] = rawBlocks.map(b => ({
        id: nanoid(),
        x: b.x,
        y: b.y,
        z: b.z,
        color: b.color
      }));

      onBuild(formattedBlocks);
    } catch (err) {
      console.error(err);
      setError("Failed to generate structure. Please try a different prompt or check your API key.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-800 w-full max-w-md rounded-2xl border border-slate-700 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Sparkles className="text-blue-400" size={24} />
              </div>
              <h2 className="text-xl font-bold text-white">Magic Builder</h2>
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <p className="text-slate-300 mb-6 text-sm leading-relaxed">
            Describe what you want to build, and Gemini AI will construct it for you voxel by voxel.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A small red castle with two towers"
                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                autoFocus
              />
            </div>

            {error && (
              <div className="mt-4 flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-600/20"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    <span>Constructing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    <span>Generate</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        <div className="bg-slate-900/50 px-6 py-4 border-t border-slate-700">
          <p className="text-xs text-slate-500 text-center">
            Powered by Google Gemini 2.5 Flash
          </p>
        </div>
      </div>
    </div>
  );
};