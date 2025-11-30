import React, { useMemo } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import { Edges } from '@react-three/drei';

interface BlockProps {
  position: [number, number, number];
  color: string;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
}

export const Block: React.FC<BlockProps> = ({ position, color, onClick }) => {
  // Memoize geometry args to avoid re-creation
  const args: [number, number, number] = [1, 1, 1];

  return (
    <group position={position}>
      <mesh onClick={onClick} castShadow receiveShadow>
        <boxGeometry args={args} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.3} 
          metalness={0.1} 
        />
        <Edges threshold={15} color="rgba(0,0,0,0.3)" />
      </mesh>
      
      {/* The Stud on top */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.2, 16]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.3} 
          metalness={0.1} 
        />
      </mesh>
    </group>
  );
};