import { UpdateMyInfoDto } from './../../dto/user/update.myinfo.dto';
import { TokenPayloadDto } from '@app/dto/token.dto';
import { Body, Controller, Get, HttpStatus, Post, Response, UseGuards, Headers, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ROLE } from 'src/constants';
import { Roles } from 'src/decorators/roles.decorator';
import { QueryListUerDto } from 'src/dto/user/query.ListUser.dto';
import { QueryMeInfoDto } from 'src/dto/user/query.MeInfo.dto';
import { QueryUserInfoDto } from 'src/dto/user/query.UserInfo.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { UserService } from 'src/services/user/user.service';
import { JwtTokenService } from 'src/shared/services/JwtTokenService.service';
import { BaseResponseDto } from '../BaseResponseDto';
import { MyInfoService } from '@app/services/user/myinfo.service';
import { UpdateMyInfoService } from '@app/services/user/update.myinfo.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private readonly myInfoService: MyInfoService,
    private readonly updateMyInfoService: UpdateMyInfoService,
    private jwtTokenService: JwtTokenService
  ) {}

  @UseGuards(AuthenticationGuard)
  @Get('info')
  async queryMyInfo(@Response() response, @Headers() Header: TokenPayloadDto) {
    const { accessToken, refreshToken } = Header;

    const { data: responseData, token: newToken } = await this.myInfoService.myInfo({ accessToken, refreshToken });

    const responseDto = new BaseResponseDto<any>();
    responseDto.request_id = 'string';
    responseDto.status = 200;
    responseDto.response_code = 'MY_INFO_200';
    responseDto.response_message = 'Get info success';
    responseDto.response_description = 'Get info success';
    responseDto.request_date_time = new Date();
    responseDto.accessToken = newToken.accessToken;
    responseDto.refreshToken = newToken.refreshToken;
    responseDto.data = responseData;
    return response.status(HttpStatus.OK).json(responseDto);
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
      username: userInToken.user.username,
      id: userInToken.user.id
    });

    const user = await this.usersService.findOne({
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
      username: userInToken.user.username,
      id: userInToken.user.id
    });

    const userList = await this.usersService.findAll({
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
  @Put('info')
  async updateMyInfo(@Response() response, @Headers() header: TokenPayloadDto, @Body() body: UpdateMyInfoDto) {
    const { accessToken, refreshToken } = header;

    const { data: responseData, token: newToken } = await this.updateMyInfoService.updateMyInfo(
      { accessToken, refreshToken },
      body
    );

    const responseDto = new BaseResponseDto<any>();
    responseDto.request_id = 'string';
    responseDto.status = 200;
    responseDto.response_code = 'UPDATE_INFO_200';
    responseDto.response_message = 'Update info success';
    responseDto.response_description = 'Update info success';
    responseDto.request_date_time = new Date();
    responseDto.accessToken = newToken.accessToken;
    responseDto.refreshToken = newToken.refreshToken;
    responseDto.data = responseData;
    return response.status(HttpStatus.OK).json(responseDto);
  }
}
