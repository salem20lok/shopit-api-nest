import { orderItems, PaymentInfo, shippingInfo } from '../order.interface';
import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  orderItems: orderItems;

  @IsNotEmpty()
  shoppingInfo: shippingInfo;

  @IsNotEmpty()
  paymentInfo: PaymentInfo;

  taxPrice: number;

  user: string;
}
