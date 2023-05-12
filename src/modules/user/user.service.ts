import { Injectable } from '@nestjs/common';
import { UserRegisterDto } from './dto/user.dto';
import { Model } from 'mongoose';
import { UserDo } from './schema/user.do';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name)
    private usersRepository: Model<UserDo>,
  ) {}

  async findAll(): Promise<any> {
    return await this.usersRepository.find({});
  }

  async findOne(data: object): Promise<any> {
    return await this.usersRepository.findOne(data);
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
