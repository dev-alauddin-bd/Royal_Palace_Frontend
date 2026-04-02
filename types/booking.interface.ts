import { IUser } from './auth.interface';
import { IRoom } from './room.interface';

interface BookingRoom {
  _id: string;
  roomId: IRoom;
  checkInDate: string;
  checkOutDate: string;
}

type BookingStatus = 'pending' | 'booked' | 'cancelled' | string;

export interface IBooking {
  _id: string;
  userId: IUser;
  rooms: BookingRoom[];
  totalAmount: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  transactionId: string;
  bookingStatus: BookingStatus;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BookingResponse {
  success: boolean;
  data: IBooking;
}
