import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/schema/user.schema';
import { UserRegisterDto } from '../user/dto/user/user.dto';
import { AdminUserService } from '../user/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private adminUserService: AdminUserService,
  ) {}

  async signIn({ username }) {
    return await this.userService.findOne({ username: username });
  }
  async findOne(data: object): Promise<UserInfoDto> {
    return this.userService.findOne({ ...data });
  }

  async create(user: UserRegisterDto) {
    return await this.userService.create(user);
  }

  async signInAdmin({ username }) {
    return await this.adminUserService.findOne({ username: username });
  }
  async findOneAdmin(data: object): Promise<UserInfoDto> {
    return this.adminUserService.findOne({ ...data });
  }

  async createAdmin(user: UserRegisterDto) {
    return await this.adminUserService.create(user);
  }
}
