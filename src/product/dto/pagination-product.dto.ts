import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationProductDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  skip?: number;

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
