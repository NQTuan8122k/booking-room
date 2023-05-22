import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserEntity } from '../schemas/user.schema';
import { UserDao } from '../dao/user/user.dao';
import { UserRegisterDto } from '../dto/user/user.dto';
import { UserInfoDto } from '@app/dto/user/user.Info.dto';

export class UserRepository {
  constructor(
    @InjectModel(UserEntity.name)
    private repository: Model<UserDao>
  ) {}

  async createNewUser(user: UserRegisterDto) {
    return await this.repository.create(user);
  }

  async findAll(data): Promise<UserInfoDto[]> {
    return await this.repository.find({
      ...data
    });
  }

  async findOne(data): Promise<UserInfoDto> {
    return await this.repository.findOne({ ...data });
  }

  async updateOne(username): Promise<any> {
    const result = await this.repository.updateOne({ username });

    return result;
  }

  async removeOne(user): Promise<any> {
    const result = await this.repository.findOneAndDelete({ _id: user });

    return result;
  }
}
