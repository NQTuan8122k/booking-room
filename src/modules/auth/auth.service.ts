import { Injectable } from '@nestjs/common';
import { UserRegisterDto } from '../user/dto/user/user.dto';
import { UserService } from '../user/user.service';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private adminService: AdminService,
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
    return await this.adminService.findOne({ username: username });
  }
  async findOneAdmin(data: object): Promise<UserInfoDto> {
    return this.adminService.findOne({ ...data });
  }

  async createAdmin(user: UserRegisterDto) {
    return await this.adminService.create(user);
  }
}
