import { AdminRegisterDto } from '@app/dto/admin/admin.dto';
import { UserLoginRequestDto } from '@app/dto/auth/login.dto';
import { AdminLoginService } from '@app/services/admin/admin.login.Service';
import { AdminSignupService } from '@app/services/admin/admin.signup.Service';
import { removePassword } from '@app/shared/utils/removePassword';
import { Body, Controller, HttpCode, HttpStatus, Post, Response, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ROLE } from 'src/constants';
import { Roles } from 'src/decorators/roles.decorator';
import { QueryListUerDto } from 'src/dto/user/query.ListUser.dto';
import { QueryMeInfoDto } from 'src/dto/user/query.MeInfo.dto';
import { QueryUserInfoDto } from 'src/dto/user/query.UserInfo.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AdminService } from 'src/services/admin/admin.service';
import { JwtTokenService } from 'src/shared/services/JwtTokenService.service';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private jwtTokenService: JwtTokenService,
    private adminSignupService: AdminSignupService,
    private adminLoginService: AdminLoginService
  ) {}

  @UseGuards(AuthenticationGuard)
  @Post('profile')
  @Roles(ROLE.USER, ROLE.ADMIN, ROLE.PROVIDER)
  async queryMyInfo(@Response() response, @Body() queryUserInfo: QueryMeInfoDto) {
    const userInToken = await this.jwtTokenService.getUserFromToken(queryUserInfo);
    if (!userInToken.user && !!userInToken.errorMessage) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        description: userInToken.errorMessage,
        error_message: userInToken.errorMessage,
        error_detail: null,
        timestamp: new Date().toISOString()
      });
    }

    const token = await this.jwtTokenService.createAuthToken({
      role: userInToken.user.role,
      username: userInToken.user.username
    });

    const user = await this.adminService.findOne({
      username: userInToken.user.username
    });
    if (user) {
      const {
        fullname,
        dateOfBirth,
        password,
        username,
        phoneNumber,
        email,
        address,
        status,
        createAt,
        lastModify,
        role,
        updatedAt
      } = user;

      return response.status(HttpStatus.OK).json({
        request_id: 'string',
        status: 200,
        response_code: 'MY_INFO_200',
        response_message: 'Get my info success',
        response_description: 'Get my info success',
        request_date_time: new Date().toISOString(),
        ...token,
        data: {
          fullname,
          dateOfBirth,
          password,
          username,
          phoneNumber,
          email,
          address,
          status,
          createAt,
          lastModify,
          role,
          updatedAt
        }
      });
    } else {
      return response.status(HttpStatus.OK).json({
        request_id: 'string',
        status: 200,
        response_code: 'MY_INFO_200',
        response_message: 'Get my info success',
        response_description: `Get my info success. But do not have user with username: ${userInToken.user.username}`,
        request_date_time: new Date().toISOString(),
        ...token,
        data: null
      });
    }
  }

  @UseGuards(AuthenticationGuard)
  @Post('userInfo')
  @Roles(ROLE.USER, ROLE.ADMIN, ROLE.PROVIDER)
  async queryUserInfo(@Response() response, @Body() queryUserInfo: QueryUserInfoDto) {
    const userInToken = await this.jwtTokenService.getUserFromToken(queryUserInfo);
    if (!userInToken.user && !!userInToken.errorMessage) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        description: userInToken.errorMessage,
        error_message: userInToken.errorMessage,
        error_detail: null,
        timestamp: new Date().toISOString()
      });
    }

    const token = await this.jwtTokenService.createAuthToken({
      role: userInToken.user.role,
      username: userInToken.user.username
    });

    const user = await this.adminService.findOne({
      ...queryUserInfo.data
    });
    console.log('asdad', queryUserInfo.data);

    if (user) {
      const {
        fullname,
        dateOfBirth,
        password,
        username,
        phoneNumber,
        email,
        address,
        status,
        createAt,
        lastModify,
        role,
        updatedAt
      } = user;

      return response.status(HttpStatus.OK).json({
        request_id: 'string',
        status: 200,
        response_code: 'USER_INFO_200',
        response_message: 'Get user info success ',
        response_description: 'Get user info success',
        request_date_time: new Date().toISOString(),
        ...token,
        data: {
          fullname,
          dateOfBirth,
          password,
          username,
          phoneNumber,
          email,
          address,
          status,
          createAt,
          lastModify,
          role,
          updatedAt
        }
      });
    } else {
      return response.status(HttpStatus.OK).json({
        request_id: 'string',
        status: 200,
        response_code: 'USER_INFO_200',
        response_message: 'Get user info success.',
        response_description: `Get user info success. But do not have user with username: ${queryUserInfo.data.username}`,
        request_date_time: new Date().toISOString(),
        ...token,
        data: null
      });
    }
  }

  @UseGuards(AuthenticationGuard)
  @Post('list')
  @Roles(ROLE.ADMIN)
  async queryUser(@Response() response, @Body() queryUserInfo: QueryListUerDto) {
    const userInToken = await this.jwtTokenService.getUserFromToken(queryUserInfo);
    if (!userInToken.user && !!userInToken.errorMessage) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        description: userInToken.errorMessage,
        error_message: userInToken.errorMessage,
        error_detail: null,
        timestamp: new Date().toISOString()
      });
    }

    const token = await this.jwtTokenService.createAuthToken({
      role: userInToken.user.role,
      username: userInToken.user.username
    });

    const userList = await this.adminService.findAll({
      ...queryUserInfo.data
    });

    return response.status(HttpStatus.OK).json({
      request_id: 'string',
      status: 200,
      response_code: 'USER_LIST_200',
      response_message: 'Get user list success',
      response_description: 'Get user list success',
      request_date_time: new Date().toISOString(),
      ...token,
      data: userList
    });
  }

  @UseGuards(AuthenticationGuard)
  @Post('updateMe')
  @Roles(ROLE.USER, ROLE.ADMIN, ROLE.PROVIDER)
  async updateMe(@Response() response, @Body() queryUserInfo: QueryMeInfoDto) {
    const userInToken = await this.jwtTokenService.getUserFromToken(queryUserInfo);
    if (!userInToken.user && !!userInToken.errorMessage) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        description: userInToken.errorMessage,
        error_message: userInToken.errorMessage,
        error_detail: null,
        timestamp: new Date().toISOString()
      });
    }

    const token = await this.jwtTokenService.createAuthToken({
      role: userInToken.user.role,
      username: userInToken.user.username
    });

    const user = await this.adminService.findOne({
      username: userInToken.user.username
    });
    if (user) {
      const {
        fullname,
        dateOfBirth,
        password,
        username,
        phoneNumber,
        email,
        address,
        status,
        createAt,
        lastModify,
        role,
        updatedAt
      } = user;

      return response.status(HttpStatus.OK).json({
        request_id: 'string',
        status: 200,
        response_code: 'MY_INFO_200',
        response_message: 'Get my info success',
        response_description: 'Get my info success',
        request_date_time: new Date().toISOString(),
        ...token,
        data: {
          fullname,
          dateOfBirth,
          password,
          username,
          phoneNumber,
          email,
          address,
          status,
          createAt,
          lastModify,
          role,
          updatedAt
        }
      });
    } else {
      return response.status(HttpStatus.OK).json({
        request_id: 'string',
        status: 200,
        response_code: 'MY_INFO_200',
        response_message: 'Get my info success',
        response_description: `Get my info success. But do not have user with username: ${userInToken.user.username}`,
        request_date_time: new Date().toISOString(),
        ...token,
        data: null
      });
    }
  }

  @Post('login')
  async signIn(
    @Response() response,
    @Body()
    loginData: UserLoginRequestDto
  ) {
    const responseData = await this.adminLoginService.login({
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

  @UseGuards(AuthenticationGuard)
  @Roles(ROLE.ADMIN)
  @Post('creation')
  async adminCreation(@Response() response, @Body() signupData: AdminRegisterDto) {
    const user = await this.adminSignupService.create(signupData);
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
