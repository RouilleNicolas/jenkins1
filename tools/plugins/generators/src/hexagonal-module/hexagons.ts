import { HexagonalLibraryConfig } from './hexagon.interface';

export const hexagons: HexagonalLibraryConfig[] = [
  { name: 'domain' },
  { name: 'infrastructure', subTypes: ['clients', 'state'] },
  { name: 'views' },
  { name: 'application' },
  { name: 'routing' },
];
