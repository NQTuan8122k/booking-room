import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ROLE } from 'src/constants';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AdminService } from './admin.service';
import { JwtTokenService } from 'src/shared/services/JwtTokenService.service';
import { QueryMeInfoDto } from '../user/dto/user/query.MeInfo.dto';
import { QueryUserInfoDto } from '../user/dto/user/query.UserInfo.dto';
import {
  QueryListUerDto,
  UserDataDto,
} from '../user/dto/user/query.ListUser.dto';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private jwtTokenService: JwtTokenService,
  ) {}

  @UseGuards(AuthenticationGuard)
  @Post('myInfo')
  @Roles(ROLE.USER, ROLE.ADMIN, ROLE.PROVIDER)
  async queryMyInfo(
    @Response() response,
    @Body() queryUserInfo: QueryMeInfoDto<object>,
  ) {
    const userInToken = await this.jwtTokenService.getUserFromToken(
      queryUserInfo,
    );
    if (!userInToken.user && !!userInToken.errorMessage) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        description: userInToken.errorMessage,
        error_message: userInToken.errorMessage,
        error_detail: null,
        timestamp: new Date().toISOString(),
      });
    }

    const token = await this.jwtTokenService.createAuthToken({
      role: userInToken.user.role,
      username: userInToken.user.username,
    });

    const user = await this.adminService.findOne({
      username: userInToken.user.username,
    });
    if (!!user) {
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
        createdAt,
        updatedAt,
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
          createdAt,
          updatedAt,
        },
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
        data: null,
      });
    }
  }

  @UseGuards(AuthenticationGuard)
  @Post('userInfo')
  @Roles(ROLE.USER, ROLE.ADMIN, ROLE.PROVIDER)
  async queryUserInfo(
    @Response() response,
    @Body() queryUserInfo: QueryUserInfoDto,
  ) {
    const userInToken = await this.jwtTokenService.getUserFromToken(
      queryUserInfo,
    );
    if (!userInToken.user && !!userInToken.errorMessage) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        description: userInToken.errorMessage,
        error_message: userInToken.errorMessage,
        error_detail: null,
        timestamp: new Date().toISOString(),
      });
    }

    const token = await this.jwtTokenService.createAuthToken({
      role: userInToken.user.role,
      username: userInToken.user.username,
    });

    const user = await this.adminService.findOne({
      ...queryUserInfo.data,
    });
    console.log('asdad', queryUserInfo.data);

    if (!!user) {
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
        createdAt,
        updatedAt,
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
          createdAt,
          updatedAt,
        },
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
        data: null,
      });
    }
  }

  @UseGuards(AuthenticationGuard)
  @Post('list')
  @Roles(ROLE.ADMIN)
  async queryUser(
    @Response() response,
    @Body() queryUserInfo: QueryListUerDto,
  ) {
    const userInToken = await this.jwtTokenService.getUserFromToken(
      queryUserInfo,
    );
    if (!userInToken.user && !!userInToken.errorMessage) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        description: userInToken.errorMessage,
        error_message: userInToken.errorMessage,
        error_detail: null,
        timestamp: new Date().toISOString(),
      });
    }

    const token = await this.jwtTokenService.createAuthToken({
      role: userInToken.user.role,
      username: userInToken.user.username,
    });

    const userList = await this.adminService.findAll({
      ...queryUserInfo.data,
    });

    return response.status(HttpStatus.OK).json({
      request_id: 'string',
      status: 200,
      response_code: 'USER_LIST_200',
      response_message: 'Get user list success',
      response_description: 'Get user list success',
      request_date_time: new Date().toISOString(),
      ...token,
      data: userList,
    });
  }

  @UseGuards(AuthenticationGuard)
  @Post('updateMe')
  @Roles(ROLE.USER, ROLE.ADMIN, ROLE.PROVIDER)
  async updateMe(
    @Response() response,
    @Body() queryUserInfo: QueryMeInfoDto<UserDataDto>,
  ) {
    const userInToken = await this.jwtTokenService.getUserFromToken(
      queryUserInfo,
    );
    if (!userInToken.user && !!userInToken.errorMessage) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        description: userInToken.errorMessage,
        error_message: userInToken.errorMessage,
        error_detail: null,
        timestamp: new Date().toISOString(),
      });
    }

    const token = await this.jwtTokenService.createAuthToken({
      role: userInToken.user.role,
      username: userInToken.user.username,
    });

    const user = await this.adminService.findOne({
      username: userInToken.user.username,
    });
    if (!!user) {
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
        createdAt,
        updatedAt,
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
          createdAt,
          updatedAt,
        },
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
        data: null,
      });
    }
  }
}
