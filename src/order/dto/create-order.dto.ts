import { orderItems } from '../order.interface';
import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  orderItems: orderItems;

  itemsPrice: number;

  taxPrice: number;

  TotalPrice: number;

  user: string;
}
