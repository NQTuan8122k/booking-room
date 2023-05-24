import { Body, Controller, HttpCode, HttpStatus, Post, Response } from '@nestjs/common';
import { UserLoginRequestDto } from 'src/dto/auth/login.dto';

import { UserRegisterDto } from '../../dto/user/user.dto';
import { UserLoginService } from '@app/services/auth/user.login.Service';
import { UserSignupService } from '@app/services/auth/user.signup.Service';
import { BaseResponseDto } from '@app/controller/BaseResponseDto';
import { ResponseUserAuthDto } from '@app/dto/user/response.login.dto';
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

    console.log('===========', responseData);

    const responseDto = new BaseResponseDto<ResponseUserAuthDto>();
    responseDto.request_id = 'string';
    responseDto.status = 200;
    responseDto.response_code = 'LOGIN_200';
    responseDto.response_message = 'Login Success';
    responseDto.response_description = 'Login Success';
    responseDto.request_date_time = new Date();
    responseDto.accessToken = responseData.token.accessToken;
    responseDto.refreshToken = responseData.token.refreshToken;
    responseDto.data = responseData.data;
    return response.status(HttpStatus.OK).json(responseDto);
  }

  @Post('signup')
  async create(@Response() response, @Body() signupData: UserRegisterDto) {
    const responseData = await this.userSignupService.signup(signupData);

    const responseDto = new BaseResponseDto<ResponseUserAuthDto>();
    responseDto.request_id = 'string';
    responseDto.status = 200;
    responseDto.response_code = 'SIGNUP_200';
    responseDto.response_message = 'Signup Success';
    responseDto.response_description = 'Signup Success';
    responseDto.request_date_time = new Date();
    responseDto.data = responseData;
    return response.status(HttpStatus.OK).json(responseDto);
  }
}
