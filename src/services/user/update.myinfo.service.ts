import { TokenPayloadDto } from '@app/dto/token.dto';
import { UpdateMyInfoDto } from '@app/dto/user/update.myinfo.dto';
import { UserRepository } from '@app/repo/user.repository';
import { JwtTokenService } from '@app/shared/services/JwtTokenService.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UpdateMyInfoService {
  constructor(private userRepository: UserRepository, private jwtTokenService: JwtTokenService) {}

  async updateMyInfo(token: TokenPayloadDto, userInfo: UpdateMyInfoDto) {
    const userInToken = await this.jwtTokenService.getUserFromToken(token);

    Object.keys(userInfo).forEach((key) => {
      if (userInfo[key] == null) {
        delete userInfo[key];
      }
    });

    console.log('userInfo', userInfo);

    if (!userInToken?.user && !!userInToken.errorMessage) {
      throw new HttpException(
        {
          status: 400,
          description: userInToken.errorMessage,
          error_message: userInToken.errorMessage,
          error_detail: null,
          timestamp: new Date().toISOString()
        },
        HttpStatus.BAD_REQUEST
      );
    }

    if (userInToken?.user.username !== userInfo.username) {
      throw new HttpException(
        {
          status: 400,
          description: 'Username not match with access token',
          error_message: 'Wrong username',
          error_detail: null,
          timestamp: new Date().toISOString()
        },
        HttpStatus.BAD_REQUEST
      );
    }

    const userResponse = await this.userRepository.updateOne(userInToken.user.id, userInfo);

    const newToken = await this.jwtTokenService.generationNewToken(token);

    if (!!userResponse) {
      return { data: userResponse, token: newToken };
    }
    throw new HttpException(
      {
        request_id: 'string',
        status: 500,
        response_code: 'UPDATE_INFO_99',
        response_message: 'Internal server error when update user info',
        response_description: 'Internal server error when update user info. Data null',
        request_date_time: new Date().toISOString()
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
