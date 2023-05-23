import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { now } from 'moment';

@Schema({ versionKey: false, timestamps: true })
export class RoomEntity {
  @Prop()
  hotel: Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  imageSrc: string[];

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
}
export type RoomDocument = HydratedDocument<RoomEntity>;

export const RoomSchema = SchemaFactory.createForClass(RoomEntity);
