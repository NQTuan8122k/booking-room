import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { now } from 'moment';

@Schema({ versionKey: false, timestamps: true })
export class RoomEntity {
  @Prop()
  hotelId: Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  imageSrc: string[];

  @Prop({ default: now() })
  createdAt: string;

  @Prop()
  category: string;

  @Prop()
  roomCount: string;

  @Prop()
  bathroomCount: string;

  @Prop()
  guestCount: string;

  @Prop()
  locationValue: string;

  @Prop()
  price: string;

  @Prop()
  updateAt: string;
}
export type RoomDocument = HydratedDocument<RoomEntity>;

export const RoomSchema = SchemaFactory.createForClass(RoomEntity);
