import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now } from 'moment';
import { HydratedDocument, Types } from 'mongoose';
import { ROLE } from 'src/constants';

import { AccountEntity } from './account.schema';
import { RoomEntity } from './rooms.schema';

@Schema({ versionKey: false, timestamps: true })
export class UserEntity {
  @Prop()
  fullname: string;

  @Prop()
  dateOfBirth: string;

  @Prop()
  password: string;

  @Prop({ required: true, index: true })
  username: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  email: string;

  @Prop()
  address: string;

  @Prop({ default: 'Active' })
  status: string;

  @Prop({ default: now() })
  createAt: Date;

  @Prop({ default: null })
  lastModify: Date | null;

  @Prop({ default: ROLE.USER })
  role: string;

  @Prop()
  avatarUrl: string;

  // @Prop({ type: Types.ObjectId, ref: AccountEntity.name })
  // accounts: Types.ObjectId[];

  @Prop()
  accounts: AccountEntity[];

  @Prop()
  rooms: RoomEntity[];

  // @Prop()
  // reservations: Reservation[];

  @Prop({ type: Types.ObjectId, ref: 'Manpower' })
  favoriteIds: Types.ObjectId[];

  // @Prop({ type: Types.ObjectId, ref: 'Manpower' })
  // manpowers: Types.ObjectId[];
}

export type UserDocument = HydratedDocument<UserEntity>;

export const UserSchema = SchemaFactory.createForClass(UserEntity);
