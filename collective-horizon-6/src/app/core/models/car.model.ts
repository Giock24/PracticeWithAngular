export type CarType =
  | 'Modern Sports Cars'
  | 'Classic Racers'
  | 'Hypercars'
  | 'Muscle Cars'
  | 'GT Cars'
  | 'Retro Sports Cars'
  | 'Super Saloons'
  | 'Extreme Track Toys'
  | 'Vintage Racers'
  | 'Trucks & 4x4s'
  | 'Buggies & Off-Road'
  | 'Vans & Utility'
  | 'Rare Classics';

export interface Car {
  id: string;           // es. "ferrari-f40"
  make: string;         // es. "Ferrari"
  model: string;        // es. "F40"
  year: number;         // es. 1992
  type: CarType;
  imagePath: string;    // es. "assets/images/cars/ferrari-f40.webp"
  owned: boolean;       // true = possiedi l'auto
  rarity?: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Forza Edition';
}