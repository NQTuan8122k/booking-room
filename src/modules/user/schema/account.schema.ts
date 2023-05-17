import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserEntity } from './user.schema';

export type UserDocument = HydratedDocument<AccountEntity>;

@Schema({ versionKey: false, timestamps: true })
export class AccountEntity {
  @Prop()
  userId: string;

  @Prop()
  type: string;

  @Prop()
  provider: string;

  @Prop()
  providerAccountId: string;

  @Prop()
  refresh_token: string;

  @Prop()
  access_token: string;

  @Prop()
  expires_at: number;

  @Prop()
  token_type: string;

  @Prop()
  scope: string;

  @Prop()
  id_token: string;

  @Prop()
  session_state: string;

  @Prop({ type: Types.ObjectId, ref: UserEntity.name })
  user: Types.ObjectId;
}

export const AccountSchema = SchemaFactory.createForClass(AccountEntity);
