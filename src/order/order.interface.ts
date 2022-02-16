export interface shippingInfo {
  address: string;
  city: string;
  phoneNo: string;
  postalCode: number;
  country: string;
}

export interface orderItems {
  name: string;
  quantity: number;
  image: string;
  price: number;
  tax: number;
  product: string;
}

export interface PaymentInfo {
  user: string;
  paidAt: Date;
  status: string;
  delivererAt: Date;
}
