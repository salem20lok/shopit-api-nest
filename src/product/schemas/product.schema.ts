import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type ProductDocument = Product & mongoose.Document;

@Schema()
export class Product {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: Number, required: true, default: 0.0 })
  price: number;
  @Prop({ type: String, required: true })
  description: string;
  @Prop({ type: Number, required: true, default: 0 })
  rating: number;
  @Prop({ type: [{ type: mongoose.Schema.Types.Mixed, required: true }] })
  images: [
    {
      public_id: { type: string; required: true };
      url: { type: string; required: true };
    },
  ];
  @Prop({
    type: String,
    required: true,
    enum: ['electronic', 'telephone', 'laptop', 'cameras', 'accessories'],
  })
  category: string;
  @Prop({ type: Number, required: true, default: 0 })
  stock: number;
  @Prop({ type: Number, required: true, default: 0 })
  numOfReviews: number;
  @Prop({ type: [{ type: mongoose.Schema.Types.Mixed, required: true }] })
  Reviews: [
    {
      name: { type: string; required: true };
      ratingUser: { type: number; required: true };
      comment: { type: string; required: true };
    },
  ];
  @Prop({ type: Date, required: true, default: Date.now })
  createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
