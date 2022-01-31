import { IsOptional } from 'class-validator';

export class filterProductDto {
  @IsOptional()
  price: number;
  @IsOptional()
  category: string;
  @IsOptional()
  name: string;
  @IsOptional()
  rating: number;
}
