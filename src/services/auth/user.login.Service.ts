import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtTokenService } from '@app/shared/services/JwtTokenService.service';
import { UserLoginRequestDto } from '@app/dto/auth/login.dto';
import { UserRepository } from '@app/repo/user.repository';
import { ResponseUserAuthDto } from '@app/dto/user/response.login.dto';

@Injectable()
export class UserLoginService {
  constructor(private readonly userRepository: UserRepository, private jwtTokenService: JwtTokenService) {}

  async login(loginData: UserLoginRequestDto) {
    try {
      const userInfo = await this.userRepository.findOne({
        username: loginData.username
      });

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

      const isMatchPassword = !!userInfo && (await bcrypt?.compare?.(loginData.password, userInfo?.password));

      if (!!userInfo?.username && userInfo?.username == loginData.username && isMatchPassword && !!userInfo?.password) {
        const token = await this.jwtTokenService.createAuthToken({
          username: userInfo.username,
          role: userInfo.role,
          id: userInfo.id
        });

        const responseData = new ResponseUserAuthDto(userInfo);

        return { data: responseData, token };
      } else {
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
    } catch (error) {
      throw new HttpException(
        {
          status: 500,
          description: 'Internal server login error not handle',
          error_message: 'Internal server login error not handle',
          error_detail: null,
          timestamp: new Date().toISOString()
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
