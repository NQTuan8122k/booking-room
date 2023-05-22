import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { now } from 'moment';

import { UserEntity } from './user.schema';

@Schema({ versionKey: false, timestamps: true })
export class RoomEntity {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  imageSrc: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop()
  category: string;

  @Prop()
  roomCount: number;

  @Prop()
  bathroomCount: number;

  @Prop()
  guestCount: number;

  @Prop()
  locationValue: string;

  @Prop()
  price: number;

  @Prop({ type: Types.ObjectId, ref: UserEntity.name })
  user: Types.ObjectId;
}
export type UserDocument = HydratedDocument<RoomEntity>;

export const AccountSchema = SchemaFactory.createForClass(RoomEntity);
