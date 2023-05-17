import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDo } from './schema/user.do';
import { UserEntity } from './schema/user.schema';
import { UserRegisterDto } from './dto/user/user.dto';

export class UserRepository {
  constructor(
    @InjectModel(UserEntity.name)
    private userModel: Model<UserDo>,
  ) {}

  async createNewUser(user: UserRegisterDto): Promise<any> {
    return await this.userModel.create(user);
  }

  async findAll(data): Promise<UserInfoDto[]> {
    return await this.userModel.find({ ...data });
  }

  async findOne(data): Promise<UserInfoDto> {
    return await this.userModel.findOne({ ...data });
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
