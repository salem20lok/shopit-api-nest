import { IsOptional } from 'class-validator';

export class filterProductDto {
  @IsOptional()
  priceSup: number;
  @IsOptional()
  priceInf: number;
  @IsOptional()
  category: string;
  @IsOptional()
  name: string;
  @IsOptional()
  ratingSup: number;
  @IsOptional()
  ratingInf: number;
}
