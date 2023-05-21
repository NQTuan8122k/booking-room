import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserEntity } from './user.schema';
import { now } from 'moment';

export type UserDocument = HydratedDocument<RoomEntity>;

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

export const AccountSchema = SchemaFactory.createForClass(RoomEntity);
