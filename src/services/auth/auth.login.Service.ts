import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtTokenService } from '@app/shared/services/JwtTokenService.service';
import { UserLoginRequestDto } from '@app/dto/auth/login.dto';
import { UserRepository } from '@app/repo/user.repository';

@Injectable()
export class AuthLoginService {
  constructor(private readonly userRepository: UserRepository, private jwtTokenService: JwtTokenService) {}

  async login(loginData: UserLoginRequestDto) {
    const userInfo = await this.userRepository.findOne({
      username: loginData.username
    });

    const isMatchPassword = await bcrypt.compare(loginData.password, userInfo?.password);

    if (!!userInfo?.username && userInfo?.username == loginData.username && isMatchPassword && !!userInfo?.password) {
      const token = await this.jwtTokenService.createAuthToken({
        username: userInfo.username,
        role: userInfo.role
      });

      return { data: userInfo, token };
    }
    if (!userInfo?.username) {
      throw new HttpException(
        {
          status: 400,
          description: 'Username is not exist',
          error_message: 'Username is not exist',
          error_detail: null,
          timestamp: new Date().toISOString()
        },
        HttpStatus.BAD_REQUEST
      );
    }
    if (userInfo?.username != loginData.username) {
      throw new HttpException(
        {
          status: 400,
          description: 'Wrong username',
          error_message: 'Wrong username',
          error_detail: null,
          timestamp: new Date().toISOString()
        },
        HttpStatus.BAD_REQUEST
      );
    }
    if (userInfo?.password != loginData.password) {
      throw new HttpException(
        {
          status: 400,
          description: 'Wrong password',
          error_message: 'Wrong password',
          error_detail: null,
          timestamp: new Date().toISOString()
        },
        HttpStatus.BAD_REQUEST
      );
    }

    throw new HttpException(
      {
        status: 500,
        description: 'Internal server error not handle',
        error_message: 'Internal server error not handle',
        error_detail: null,
        timestamp: new Date().toISOString()
      },
      HttpStatus.BAD_REQUEST
    );
  }
}
