export interface Product {
  name: string;
  price: number;
  description: string;
  rating: number;
  images: image[];
  category: string;
  stock: number;
  numOfReviews: number;
  Reviews: Review[];
  createdAt: Date;
}

export interface Review {
  name: string;
  ratingUser: number;
  comment: string;
}

export interface image {
  public_id: string;
  utl: string;
}
