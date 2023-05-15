import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRegisterDto } from './dto/user/user.dto';
import { UserDo } from './schema/user.do';
import { AdminEntity } from './schema/admin.schema';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectModel(AdminEntity.name)
    private usersRepository: Model<UserDo>,
  ) {}

  async findOne(data: object): Promise<UserInfoDto> {
    return await this.usersRepository.findOne({ ...data });
  }

  async create(user: UserRegisterDto) {
    return await this.usersRepository.create(user);
  }

  async update(user: any) {
    return await this.usersRepository.updateOne({ username: user });
  }

  async delete(id) {
    return await this.usersRepository.findOneAndUpdate({ _id: id });
  }
}
