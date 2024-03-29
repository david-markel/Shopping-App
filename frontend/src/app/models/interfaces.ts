export interface ItemData {
  imageSrc: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  _id: string;
  collectionName: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface LoginResponse {
  auth: boolean;
  token: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  subscriptionPlan: string;
  id: string;
  address: {
    address1: string;
    address2: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
  };
}

export interface Order {
  _id: string;
  userId: string;
  items: ItemData;
  totalCost: number;
  address: string;
  status: 'processing' | 'shipping' | 'delivered' | 'cancelled';
  datePlaced: Date;
}
