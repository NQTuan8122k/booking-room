import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Response,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from '../user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('signup')
  async create(@Response() response, @Body() signupData: UserRegisterDto) {
    try {
      const user = await this.authService.findOne({
        username: signupData?.username,
      });

      if (!!user?.username) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          status: 400,
          description: 'Duplicate username',
          error_message: 'Duplicate username',
          error_detail: null,
          timestamp: new Date().toISOString(),
        });
      } else {
        const signupUser = await this.authService.create({
          ...signupData,
          createAt: new Date().toISOString(),
        });

        if (!!signupUser.username) {
          response.status(HttpStatus.CREATED).json({
            request_id: 'string',
            status: 201,
            response_code: 'SIGNUP_200',
            response_message: 'Create success',
            response_description: 'Create new user success',
            request_date_time: new Date().toISOString(),
            data: signupUser,
          });
        } else {
          response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: 500,
            description: 'Signup internal error',
            error_message: 'Internal server error',
            error_detail: null,
            timestamp: new Date().toISOString(),
          });
        }
      }
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 500,
        description: 'Signup internal error',
        error_message: 'Internal server error',
        error_detail: error,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
