import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { UserEntity } from './user.schema';

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
  refreshToken: string;

  @Prop()
  accessToken: string;

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
}

export type UserDocument = HydratedDocument<AccountEntity>;

export const AccountSchema = SchemaFactory.createForClass(AccountEntity);
