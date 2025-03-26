export interface Character {
  id: number;
  name: string;
  images: { md: string; lg: string  };
  biography: { fullName: string | null };
  powerstats: {
    intelligence: number;
    strength: number;
    speed: number;
    durability: number;
    power: number;
    combat: number;
  };
}