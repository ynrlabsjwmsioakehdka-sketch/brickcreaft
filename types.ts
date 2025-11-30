export interface BlockData {
  id: string;
  x: number;
  y: number;
  z: number;
  color: string;
}

export interface ColorOption {
  name: string;
  value: string;
  hex: string;
}

export interface GeneratedBlock {
  x: number;
  y: number;
  z: number;
  color: string;
}