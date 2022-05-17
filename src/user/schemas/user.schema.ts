import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { RoleEnum } from '../../auth/authorization/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, required: true, unique: true, index: true })
  name: string;
  @Prop({ type: String, required: true, unique: true, index: true })
  email: string;
  @Prop({ type: String, required: true })
  password: string;
  @Prop({ type: mongoose.Schema.Types.Mixed })
  avatar: {
    public_id: { type: string; required: true };
    url: { type: string; required: true; default: '/images/avatar/avatar.png' };
  };
  @Prop({ type: [String], default: RoleEnum.user, enum: RoleEnum })
  role: string[];
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
  @Prop({ type: String })
  resetPasswordToken: string;
  @Prop({ type: Date })
  resetPasswordExpire: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
