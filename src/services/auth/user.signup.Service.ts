import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRegisterDto } from '../../dto/user/user.dto';
import { UserRepository } from '../../repo/user.repository';
import { ROLE } from '../../constants';
import { ResponseUserAuthDto } from '@app/dto/user/respone.login.dto';

@Injectable()
export class UserSignupService {
  constructor(private readonly userRepository: UserRepository) {}

  async signup(signupData: UserRegisterDto) {
    const user = await this.userRepository.findOne({
      username: signupData.username
    });

    const saltOrRounds = 10;
    // const saltOrRounds = await bcrypt.genSalt();

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

    const { address, dateOfBirth, email, fullname, password, phoneNumber, role, username } = signupData;

    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    const signupUser = await this.userRepository.createNewUser({
      address,
      dateOfBirth,
      email,
      fullname,
      password: hashPassword,
      phoneNumber,
      ...(role === ROLE.USER || role === ROLE.PROVIDER ? { role } : { role: undefined }),
      username,
      createAt: new Date().toISOString()
    });

    if (signupUser.username) {
      const responseData = new ResponseUserAuthDto(signupUser);
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
