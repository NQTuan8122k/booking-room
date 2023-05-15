import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { ROLE } from 'src/constants';
import { RoleType } from 'src/constants/role-file';

export type UserDocument = HydratedDocument<AdminEntity>;

@Schema({ versionKey: false, timestamps: true })
export class AdminEntity {
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

  @Prop()
  createAt: string;

  @Prop({ default: null })
  lastModify: string | null;

  @Prop({ default: ROLE.USER })
  role: string;

  @Prop()
  avatarUrl: string;

  // @Prop({ type: Types.ObjectId, ref: 'Manpower' })
  // manpowers: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(AdminEntity);
