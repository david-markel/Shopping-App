export interface ItemData {
  imageSrc: string;
  title: string;
  description: string;
  price: number;
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
  address: {
    address1: string;
    address2: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
  };
}
