import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDao } from '../dao/user/user.dao';
import { UserRegisterDto } from '../dto/user/user.dto';
import { UserEntity } from '../schemas/user.schema';

export class UserRepository {
  constructor(
    @InjectModel(UserEntity.name)
    private repository: Model<UserDao>
  ) {}

  async createNewUser(user: UserRegisterDto): Promise<UserDao> {
    return await this.repository.create(user);
  }

  async findAll(data): Promise<UserDao[]> {
    return await this.repository.find({
      ...data
    });
  }

  async findOne(data): Promise<UserDao> {
    return await this.repository.findOne({ ...data });
  }

  async removeOne(user): Promise<UserDao> {
    const result = await this.repository.findOneAndDelete({ id: user });

    return result;
  }

  async updateOne(id, dataUpdate): Promise<UserDao> {
    try {
      return await this.repository.findByIdAndUpdate(
        { id: id },
        {
          $set: {
            ...dataUpdate
          }
        },
        {
          new: true
        }
      );
    } catch (error) {
      console.log('=** error', error);
    }
  }
}
