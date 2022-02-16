import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User, UserDocument } from '../../user/schemas/user.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ type: mongoose.Schema.Types.Mixed })
  shoppingInfo: {
    address: { type: string; required: true };
    city: { type: string; required: true };
    phoneNo: { type: string; required: true };
    postalCode: { type: number; required: true };
    country: { type: string; required: true };
  };

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User.name,
  })
  user: UserDocument;

  @Prop({ type: [{ type: mongoose.Schema.Types.Mixed, required: true }] })
  orderItems: [
    {
      name: { type: string; required: true };
      quantity: { type: number; required: true };
      image: { type: string; required: true };
      price: { type: number; required: true };
      tax: { type: number; required: true };
      product: {
        type: mongoose.Schema.Types.ObjectId;
        required: true;
      };
    },
  ];

  @Prop({ type: mongoose.Schema.Types.Mixed })
  paymentInfo: {
    user: string;
    paidAt: Date;
    status: string;
    delivererAt: Date;
  };

  @Prop({
    type: String,
    default: 'processing',
    enum: ['delivered', 'processing', 'waiting', 'confirmed'],
  })
  orderStatus: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
