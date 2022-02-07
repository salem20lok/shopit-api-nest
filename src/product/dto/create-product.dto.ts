import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { image, Review } from '../product.interface';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(105)
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  rating: number;

  @IsNotEmpty()
  images: image[];

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  stock: number;

  @IsNotEmpty()
  numOfReviews: number;

  @IsNotEmpty()
  Reviews: Review[];
}
