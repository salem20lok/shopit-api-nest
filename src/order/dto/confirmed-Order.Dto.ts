import { IsNotEmpty } from 'class-validator';
import { PaymentInfo, shippingInfo } from '../order.interface';

export class ConfirmedOrderDto {
  @IsNotEmpty()
  shoppingInfo: shippingInfo;
  @IsNotEmpty()
  paymentInfo: PaymentInfo;
}
