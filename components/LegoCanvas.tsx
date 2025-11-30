import React, { useState } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import { Block } from './Block';
import { BlockData } from '../types';
import { nanoid } from 'nanoid';

interface LegoCanvasProps {
  blocks: BlockData[];
  setBlocks: (blocks: BlockData[]) => void;
  selectedColor: string;
}

export const LegoCanvas: React.FC<LegoCanvasProps> = ({ blocks, setBlocks, selectedColor }) => {
  const [hoverPos, setHoverPos] = useState<[number, number, number] | null>(null);

  const handlePlaneClick = (e: ThreeEvent<MouseEvent>) => {
    // Stop propagation to prevent double clicks if clicking through transparent objects (rare but good practice)
    e.stopPropagation();

    if (e.delta > 10) return; // Dragging, not clicking

    // The floor is at y=0. However, the center of a block at y=0 is at y=0.5
    // We want integer coordinates for the grid.
    const x = Math.round(e.point.x);
    const z = Math.round(e.point.z);
    const y = 0; // Ground level

    addBlock(x, y, z);
  };

  const handleBlockClick = (e: ThreeEvent<MouseEvent>, clickedBlock: BlockData) => {
    e.stopPropagation();
    
    if (e.delta > 10) return;

    if (e.nativeEvent.altKey) {
      // Remove block
      removeBlock(clickedBlock.id);
    } else {
      // Stack block
      // Get the face normal to know where to place the new block
      if (!e.face) return;
      
      const { x: nx, y: ny, z: nz } = e.face.normal;
      
      const newX = clickedBlock.x + nx;
      const newY = clickedBlock.y + ny;
      const newZ = clickedBlock.z + nz;

      // Don't allow placing below ground
      if (newY < 0) return;

      addBlock(newX, newY, newZ);
    }
  };

  const addBlock = (x: number, y: number, z: number) => {
    // Check if a block already exists at this position
    const exists = blocks.some(b => b.x === x && b.y === y && b.z === z);
    if (exists) return;

    const newBlock: BlockData = {
      id: nanoid(),
      x,
      y,
      z,
      color: selectedColor
    };

    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const handlePointerMove = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const x = Math.round(e.point.x);
    const z = Math.round(e.point.z);
    // Just a visual indicator helper could go here
  };

  return (
    <group>
      {/* Invisible Plane for Ground Detection */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]} 
        onClick={handlePlaneClick}
        onPointerMove={handlePointerMove}
        visible={false}
      >
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial />
      </mesh>

      {/* Render Blocks */}
      {blocks.map((block) => (
        <Block
          key={block.id}
          position={[block.x, block.y + 0.5, block.z]} // Offset y by 0.5 because BoxGeometry centers at 0
          color={block.color}
          onClick={(e) => handleBlockClick(e, block)}
        />
      ))}
      
      {/* Optional: Ghost block for hover effect could go here */}
    </group>
  );
};