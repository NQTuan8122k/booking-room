import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserRegisterDto } from '../user/dto/user.dto';
import { UserEntity } from '../user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username = '', pass) {
    const user = await this.userService.findOne({ username: username });
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user?.username, sub: user?.userId };
    return {
      // access_token: 'await this.jwtService.signAsync(payload)',
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async findOne(data: object): Promise<UserEntity> {
    return this.userService.findOne({ ...data });
  }

  async create(user: UserRegisterDto) {
    return this.userService.create(user);
  }
}
