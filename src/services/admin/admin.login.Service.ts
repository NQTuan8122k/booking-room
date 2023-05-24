import { ResponseAdminAuthDto } from '@app/dto/admin/respone.login.dto';
import { UserLoginRequestDto } from '@app/dto/auth/login.dto';
import { AdminRepository } from '@app/repo/admin.repository';
import { JwtTokenService } from '@app/shared/services/JwtTokenService.service';
import { removePassword } from '@app/shared/utils/removePassword';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminLoginService {
  constructor(private readonly adminRepository: AdminRepository, private jwtTokenService: JwtTokenService) {}

  async login(loginData: UserLoginRequestDto) {
    const userInfo = await this.adminRepository.findOne({
      username: loginData.username
    });

    const isMatchPassword = await bcrypt.compare(loginData.password, userInfo?.password);

    if (!!userInfo?.username && userInfo?.username == loginData.username && isMatchPassword && !!userInfo?.password) {
      const token = await this.jwtTokenService.createAuthToken({
        username: userInfo.username,
        role: userInfo.role,
        id: userInfo.id
      });

      const responseData = new ResponseAdminAuthDto(userInfo);

      return { data: responseData, token };
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
