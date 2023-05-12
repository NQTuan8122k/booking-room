import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDo } from './schema/user.do';

export class UsersRepository {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserDo>,
  ) {}

  async createOne(user): Promise<any> {
    const result = await this.userModel.create(user);
    return result;
  }

  async findAll(): Promise<any> {
    const result = await this.userModel.find({});
    return result;
  }

  async findOne(username): Promise<any> {
    const result = await this.userModel.findOne({ username });
    return result;
  }

  async updateOne(username): Promise<any> {
    const result = await this.userModel.updateOne({ username });
    return result;
  }

  async removeOne(user): Promise<any> {
    const result = await this.userModel.findOneAndDelete({ _id: user });
    return result;
  }
}
