import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ROLE } from 'src/constants';

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
export type UserDocument = HydratedDocument<AdminEntity>;

export const AdminSchema = SchemaFactory.createForClass(AdminEntity);
