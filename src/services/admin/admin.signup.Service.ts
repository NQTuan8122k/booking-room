import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AdminRepository } from '@app/repo/admin.repository';
import { ROLE } from '../../constants';
import { AdminRegisterDto } from '@app/dto/admin/admin.dto';
import { ResponseAdminAuthDto } from '@app/dto/admin/respone.login.dto';

@Injectable()
export class AdminSignupService {
  constructor(private readonly adminRepository: AdminRepository) {}

  async create(registerData: AdminRegisterDto) {
    const signupData = registerData.data;

    const user = await this.adminRepository.findOne({
      username: signupData.username
    });

    const saltOrRounds = 10;

    if (user?.username) {
      throw new HttpException(
        {
          status: 400,
          description: 'Duplicate username',
          error_message: 'Duplicate username',
          error_detail: null,
          timestamp: new Date().toISOString()
        },
        HttpStatus.BAD_REQUEST
      );
    }

    const { fullname, password, username } = signupData;

    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    const signupUser = await this.adminRepository.createNewUser({
      fullname,
      password: hashPassword,
      role: ROLE.ADMIN,
      username,
      createAt: new Date().toISOString()
    });

    if (signupUser.username) {
      const responseData = new ResponseAdminAuthDto(signupUser);
      return responseData;
    }

    throw new HttpException(
      {
        status: 500,
        description: 'Signup internal error',
        error_message: 'Internal server error',
        error_detail: null,
        timestamp: new Date().toISOString()
      },
      HttpStatus.BAD_REQUEST
    );
  }
}
