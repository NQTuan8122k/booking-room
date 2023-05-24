import { TokenPayloadDto } from '@app/dto/token.dto';
import { UserRepository } from '@app/repo/user.repository';
import { JwtTokenService } from '@app/shared/services/JwtTokenService.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class MyInfoService {
  constructor(private userRepository: UserRepository, private jwtTokenService: JwtTokenService) {}

  async myInfo(token: TokenPayloadDto) {
    const userInToken = await this.jwtTokenService.getUserFromToken(token);

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

    const newToken = await this.jwtTokenService.generationNewToken(token);

    const userResponse = await this.userRepository.findOne({
      username: userInToken.user.username
    });

    if (!!userResponse) {
      return { data: userResponse, token: newToken };
    }
    throw new HttpException(
      {
        request_id: 'string',
        status: 500,
        response_code: 'MY_INFO_99',
        response_message: 'Internal server error when get user info',
        response_description: 'Internal server error when get user info. Data null',
        request_date_time: new Date().toISOString()
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
