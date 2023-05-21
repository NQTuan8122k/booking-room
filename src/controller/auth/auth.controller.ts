import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Response,
} from '@nestjs/common';
import { ROLE } from 'src/constants';
import { Roles } from 'src/decorators/roles.decorator';
import { UserLoginRequestDto } from 'src/dto/auth/login.dto';
import { AuthLoginService } from 'src/services/auth/auth.login.Service';
import { AuthSignupService } from 'src/services/auth/auth.signup.Service';
import { UserRegisterDto } from '../../dto/user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authSignupService: AuthSignupService,
    private authLoginService: AuthLoginService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Response() response,
    @Body()
    loginData: UserLoginRequestDto,
  ) {
    const responseData = await this.authLoginService.login({
      ...loginData,
    });

    return response.status(HttpStatus.OK).json({
      request_id: 'string',
      status: 200,
      response_code: 'LOGIN_200',
      response_message: 'Login success',
      response_description: 'Login success',
      request_date_time: new Date().toISOString(),
      token: responseData.token,
      data: responseData.data,
    });
  }

  @Post('signup')
  async create(@Response() response, @Body() signupData: UserRegisterDto) {
    const user = await this.authSignupService.signup(signupData);
    response.status(HttpStatus.CREATED).json({
      request_id: 'string',
      status: 201,
      response_code: 'SIGNUP_200',
      response_message: 'Create success',
      response_description: 'Create new user success',
      request_date_time: new Date().toISOString(),
      data: user,
    });
  }
}
