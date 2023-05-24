import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { now } from 'moment';

@Schema({ versionKey: false, timestamps: true })
export class HotelEntity {
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
export type HotelDocument = HydratedDocument<HotelEntity>;

export const HotelSchema = SchemaFactory.createForClass(HotelEntity);
