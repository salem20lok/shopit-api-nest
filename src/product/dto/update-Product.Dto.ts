import { image, Review } from '../product.interface';
import { IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  name: string;
  @IsOptional()
  price: number;
  @IsOptional()
  description: string;
  @IsOptional()
  rating: number;
  @IsOptional()
  images: image[];
  @IsOptional()
  category: string;
  @IsOptional()
  stock: number;
  @IsOptional()
  numOfReviews: number;
  @IsOptional()
  Reviews: Review[];
  @IsOptional()
  createdAt: Date;
}
