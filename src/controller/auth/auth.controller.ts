import { Body, Controller, HttpCode, HttpStatus, Post, Response } from '@nestjs/common';
import { UserLoginRequestDto } from 'src/dto/auth/login.dto';

import { UserRegisterDto } from '../../dto/user/user.dto';
import { UserLoginService } from '@app/services/auth/user.login.Service';
import { UserSignupService } from '@app/services/auth/user.signup.Service';

@Controller('auth')
export class AuthController {
  constructor(private userSignupService: UserSignupService, private userLoginService: UserLoginService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Response() response,
    @Body()
    loginData: UserLoginRequestDto
  ) {
    const responseData = await this.userLoginService.login({
      ...loginData
    });

    return response.status(HttpStatus.OK).json({
      request_id: 'string',
      status: 200,
      response_code: 'LOGIN_200',
      response_message: 'Login success',
      response_description: 'Login success',
      request_date_time: new Date().toISOString(),
      ...responseData.token,
      data: responseData.data
    });
  }

  @Post('signup')
  async create(@Response() response, @Body() signupData: UserRegisterDto) {
    const user = await this.userSignupService.signup(signupData);
    response.status(HttpStatus.CREATED).json({
      request_id: 'string',
      status: 201,
      response_code: 'SIGNUP_200',
      response_message: 'Create success',
      response_description: 'Create new user success',
      request_date_time: new Date().toISOString(),
      data: user
    });
  }
}
