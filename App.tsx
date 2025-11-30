import React, { useState, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, ContactShadows, Environment } from '@react-three/drei';
import { LegoCanvas } from './components/LegoCanvas';
import { Toolbar } from './components/Toolbar';
import { AIBuilderModal } from './components/AIBuilderModal';
import { Header } from './components/Header';
import { Instructions } from './components/Instructions';
import { BlockData, ColorOption } from './types';
import { DEFAULT_COLORS } from './constants';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>(DEFAULT_COLORS[0].value);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [history, setHistory] = useState<BlockData[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const updateBlocks = (newBlocks: BlockData[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newBlocks);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setBlocks(newBlocks);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setBlocks(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setBlocks(history[historyIndex + 1]);
    }
  };

  const handleClear = () => {
    updateBlocks([]);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-900 text-white overflow-hidden">
      <Header 
        onAIBuilderClick={() => setIsAIModalOpen(true)} 
        onClear={handleClear}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        blockCount={blocks.length}
      />
      
      <div className="flex-1 relative">
        <div className="absolute inset-0 z-0">
          <Canvas shadows camera={{ position: [10, 10, 10], fov: 45 }}>
            <color attach="background" args={['#1e293b']} />
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <pointLight position={[20, 20, 20]} intensity={1} castShadow />
              <pointLight position={[-20, 20, -20]} intensity={0.5} />
              
              <Grid 
                infiniteGrid 
                fadeDistance={50} 
                sectionColor="#475569" 
                cellColor="#334155" 
                position={[0, -0.01, 0]} 
              />
              
              <LegoCanvas 
                blocks={blocks} 
                setBlocks={updateBlocks} 
                selectedColor={selectedColor} 
              />
              
              <ContactShadows opacity={0.5} scale={50} blur={2} far={10} resolution={256} color="#000000" />
              <Environment preset="city" />
              <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />
            </Suspense>
          </Canvas>
        </div>

        <div className="absolute top-4 left-4 z-10">
           <Instructions />
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <Toolbar 
            selectedColor={selectedColor} 
            onColorSelect={setSelectedColor} 
          />
        </div>
      </div>

      {isAIModalOpen && (
        <AIBuilderModal 
          isOpen={isAIModalOpen} 
          onClose={() => setIsAIModalOpen(false)} 
          onBuild={(generatedBlocks) => {
            updateBlocks(generatedBlocks);
            setIsAIModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default App;