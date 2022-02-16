import { IsOptional } from 'class-validator';
import { orderItems, PaymentInfo, shippingInfo } from '../order.interface';

export class UpdateOrderDto {
  @IsOptional()
  shoppingInfo: shippingInfo;

  @IsOptional()
  orderItems: orderItems;

  @IsOptional()
  paymentInfo: PaymentInfo;
}
