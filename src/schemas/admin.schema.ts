import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ROLE } from 'src/constants';

@Schema({ versionKey: false, timestamps: true })
export class AdminEntity {
  @Prop()
  fullname: string;

  @Prop()
  password: string;

  @Prop({ required: true, index: true })
  username: string;

  @Prop({ default: 'Active' })
  status: string;

  @Prop()
  createAt: Date;

  @Prop({ default: null })
  lastModify: Date | null;

  @Prop({ default: ROLE.ADMIN })
  role: string;
}
export type AdminDocument = HydratedDocument<AdminEntity>;

export const AdminSchema = SchemaFactory.createForClass(AdminEntity);
