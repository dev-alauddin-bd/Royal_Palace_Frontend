// Room interface

// ENUM from backend
export enum RoomType {
  Luxury = 'luxury',
  Suite = 'suite',
  Deluxe = 'deluxe',
  Twin = 'twin',
}
export enum BedType {
  King = 'king',
  Queen = 'queen',
  Twin = 'twin',
  Double = 'double',
  Single = 'single',
}

export interface IRoom {
  _id: string;
  roomNumber: string;
  images?: string[];
  floor: number;
  title?: string;
  description?: string;
  type: RoomType;
  features: string[];
  price: number;
  bed: {
    type: BedType;
    count: number;
  };
  adults: number;
  children: number;
}

export interface ICart {
  roomId: string;
  name: string;
  image: string;
  price: number;
  checkInDate: string; // YYYY-MM-DD string
  checkOutDate: string; // YYYY-MM-DD string
}
