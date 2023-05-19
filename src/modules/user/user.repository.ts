import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDo } from './schema/user.do';
import { UserEntity } from './schema/user.schema';
import { UserRegisterDto } from './dto/user/user.dto';

export class UserRepository {
  constructor(
    @InjectModel(UserEntity.name)
    private userRepository: Model<UserDo>,
  ) {}

  async createNewUser(user: UserRegisterDto): Promise<any> {
    return await this.userRepository.create(user);
  }

  async findAll(data): Promise<UserInfoDto[]> {
    return await this.userRepository.find({
      ...data,
    });
  }

  async findOne(data): Promise<UserInfoDto> {
    return await this.userRepository.findOne({ ...data });
  }

  async updateOne(username): Promise<any> {
    const result = await this.userRepository.updateOne({ username });
    return result;
  }

  async removeOne(user): Promise<any> {
    const result = await this.userRepository.findOneAndDelete({ _id: user });
    return result;
  }
}
