import {
  Body,
  Controller,
  HttpStatus,
  Get,
  Response,
  Post,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async createUser(@Body() createUserDto: any) {
    return 'asdadasdd';
  }

  @Post()
  async findOne(@Response() response, @Body() signupData: UserRegisterDto) {
    const user = await this.usersService.findOne({
      username: signupData?.username,
    });

    // .catch((error) => {
    //   return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    //     status: 500,
    //     description: 'Checking user info in database error',
    //     error_message: 'Internal server error',
    //     error_detail: error,
    //     timestamp: new Date().toISOString(),
    //   });
    // });

    if (!!user?.username) {
      return response.status(HttpStatus.OK).json({
        status: 200,
        request_id: 'string',
        response_code: 'AUTH_200',
        response_message: 'Get user info success',
        response_description: 'Get user info success',
        request_date_time: new Date().toISOString(),
        access_token: 'string',
        refresh_token: 'string',
        data: user,
      });
    } else {
      return response.status(HttpStatus.OK).json({
        status: 200,
        response_code: 'AUTH_200',
        response_message: 'Not Found User',
        response_description: 'Not Found User',
        request_date_time: new Date().toISOString(),
        access_token: 'string',
        refresh_token: 'string',
        data: null,
      });
    }
  }
}
