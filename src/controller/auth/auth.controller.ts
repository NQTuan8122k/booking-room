import { Body, Controller, HttpCode, HttpStatus, Post, Response } from '@nestjs/common';
import { UserLoginRequestDto } from 'src/dto/auth/login.dto';

import { UserRegisterDto } from '../../dto/user/user.dto';
import { UserLoginService } from '@app/services/auth/user.login.Service';
import { UserSignupService } from '@app/services/auth/user.signup.Service';
import { BaseResponseDto } from '@app/controller/BaseResponseDto';
import { ResponseUserAuthDto } from '@app/dto/user/respone.login.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private userSignupService: UserSignupService, private userLoginService: UserLoginService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOkResponse({ type: BaseResponseDto })
  async signIn(
    @Response() response,
    @Body()
    loginData: UserLoginRequestDto
  ): Promise<BaseResponseDto<ResponseUserAuthDto>> {
    const responseData = await this.userLoginService.login({
      ...loginData
    });

    const responseDto = new BaseResponseDto<ResponseUserAuthDto>();
    responseDto.request_id = 'string';
    responseDto.status = 200;
    responseDto.response_code = 'LOGIN_200';
    responseDto.response_message = 'Login Succes';
    responseDto.response_description = 'Login Succes';
    responseDto.request_date_time = new Date();
    responseDto.access_token = responseData.token.accessToken;
    responseDto.refresh_token = responseData.token.refreshToken;
    responseDto.data = responseData.data;
    return response.status(HttpStatus.OK).body(responseDto);
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
