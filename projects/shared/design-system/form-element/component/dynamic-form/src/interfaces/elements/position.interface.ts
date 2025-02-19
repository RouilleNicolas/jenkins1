export interface Position {
  x: number;
  y: number;
  size?: Partial<Omit<Position, 'size'>>;
}
