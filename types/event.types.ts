export interface Event {
  id: string;
  name: Record<string, string>;
  description: Record<string, string>;
  date: number;
  from: number;
  to: number;
  price: number;
  url: string;
  active: boolean;
  coverImageUrl: string;
}