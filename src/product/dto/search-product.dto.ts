import { IsOptional } from 'class-validator';

export class searchProductDto {
  @IsOptional()
  name: string;
}
