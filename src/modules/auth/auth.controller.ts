import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Response,
} from '@nestjs/common';
import { ROLE } from 'src/constants';
import { JwtTokenService } from 'src/shared/services/JwtTokenService.service';
import { UserLoginRequestDto } from '../user/dto/login.dto';
import { AuthService } from './auth.service';
import { UserRegisterDto } from '../user/dto/user/user.dto';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtTokenService: JwtTokenService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Response() response,
    @Body()
    loginData: UserLoginRequestDto,
  ) {
    try {
      const userInfo = await this.authService.signIn({
        ...loginData,
      });
      if (
        !!userInfo?.username &&
        userInfo?.username == loginData.username &&
        userInfo?.password == loginData.password &&
        !!userInfo?.password
      ) {
        const token = await this.jwtTokenService.createAuthToken({
          username: userInfo.username,
          role: userInfo.role,
        });

        return response.status(HttpStatus.OK).json({
          request_id: 'string',
          status: 200,
          response_code: 'LOGIN_200',
          response_message: 'Login success',
          response_description: 'Login success',
          request_date_time: new Date().toISOString(),
          ...token,
          data: userInfo,
        });
      } else if (!userInfo?.username) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          status: 400,
          description: 'Username is not exist',
          error_message: 'Username is not exist',
          error_detail: null,
          timestamp: new Date().toISOString(),
        });
      } else if (userInfo?.username != loginData.username) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          status: 400,
          description: 'Wrong username',
          error_message: 'Wrong username',
          error_detail: null,
          timestamp: new Date().toISOString(),
        });
      } else if (userInfo?.password != loginData.password) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          status: 400,
          description: 'Wrong password',
          error_message: 'Wrong password',
          error_detail: null,
          timestamp: new Date().toISOString(),
        });
      } else {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 500,
          description: 'Internal server error not handle',
          error_message: 'Internal server error not handle',
          error_detail: null,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 500,
        description: 'Login internal error',
        error_message: 'Internal server error',
        error_detail: error,
        timestamp: new Date().toISOString(),
      });
    }
  }

  @Post('signup')
  async create(@Response() response, @Body() signupData: UserRegisterDto) {
    try {
      const user = await this.authService.findOne({
        username: signupData?.username,
      });

      const {
        address,
        createAt,
        dateOfBirth,
        email,
        fullname,
        password,
        phoneNumber,
        role,
        username,
      } = signupData;

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
          address,
          dateOfBirth,
          email,
          fullname,
          password,
          phoneNumber,
          ...(role === ROLE.USER || role === ROLE.PROVIDER
            ? { role }
            : { role: undefined }),
          username,
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

  @HttpCode(HttpStatus.OK)
  @Post('admin/login')
  async adminSignIn(
    @Response() response,
    @Body()
    loginData: UserLoginRequestDto,
  ) {
    try {
      const userInfo = await this.authService.signInAdmin({
        ...loginData,
      });
      if (
        !!userInfo?.username &&
        userInfo?.username == loginData.username &&
        userInfo?.password == loginData.password &&
        !!userInfo?.password
      ) {
        const token = await this.jwtTokenService.createAuthToken({
          username: userInfo.username,
          role: userInfo.role,
        });

        return response.status(HttpStatus.OK).json({
          request_id: 'string',
          status: 200,
          response_code: 'LOGIN_200',
          response_message: 'Login success',
          response_description: 'Login success',
          request_date_time: new Date().toISOString(),
          ...token,
          data: userInfo,
        });
      } else if (!userInfo?.username) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          status: 400,
          description: 'Username is not exist',
          error_message: 'Username is not exist',
          error_detail: null,
          timestamp: new Date().toISOString(),
        });
      } else if (userInfo?.username != loginData.username) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          status: 400,
          description: 'Wrong username',
          error_message: 'Wrong username',
          error_detail: null,
          timestamp: new Date().toISOString(),
        });
      } else if (userInfo?.password != loginData.password) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          status: 400,
          description: 'Wrong password',
          error_message: 'Wrong password',
          error_detail: null,
          timestamp: new Date().toISOString(),
        });
      } else {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 500,
          description: 'Internal server error not handle',
          error_message: 'Internal server error not handle',
          error_detail: null,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 500,
        description: 'Login internal error',
        error_message: 'Internal server error',
        error_detail: error,
        timestamp: new Date().toISOString(),
      });
    }
  }

  @Roles(ROLE.ADMIN)
  @Post('admin/create')
  async adminSignUp(@Response() response, @Body() signupData: UserRegisterDto) {
    try {
      const user = await this.authService.findOne({
        username: signupData?.username,
      });

      const {
        address,
        createAt,
        dateOfBirth,
        email,
        fullname,
        password,
        phoneNumber,
        role,
        username,
      } = signupData;

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
          address,
          dateOfBirth,
          email,
          fullname,
          password,
          phoneNumber,
          ...(role === ROLE.USER || role === ROLE.PROVIDER
            ? { role }
            : { role: undefined }),
          username,
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
