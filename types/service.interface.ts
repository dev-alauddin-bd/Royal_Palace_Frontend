export interface IService {
  _id?: string;
  name: string;
  image: string;
  description?: string;
  pricePerDay: number;
  isServiceFree: boolean;
  isDeleted?: boolean;
}
