export interface Character {
  id: number;
  name: string;
  images: { md: string };
  biography: { fullName?: string };
}