import { HotelCreationDto } from '@app/dto/hotel/create.hotel.dto';
import { TokenPayloadDto } from '@app/dto/token.dto';
import { HotelCreationService } from '@app/services/hotel/hotel.create.service';
import { Body, Controller, Headers, HttpStatus, Post, Response } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseResponseDto } from '../BaseResponseDto';

@ApiTags('hotels')
@Controller('hotels')
export class HotelController {
  constructor(private readonly hotelCreationService: HotelCreationService) {}

  // @UseGuards(AuthenticationGuard)
  // @Roles(ROLE.PROVIDER)
  @Post('new')
  async createNewRoom(@Response() response, @Headers() header: TokenPayloadDto, @Body() hotelInfo: HotelCreationDto) {
    const { accessToken, refreshToken } = header;

    console.log('*********', hotelInfo);

    const { data: responseData, token: newToken } = await this.hotelCreationService.createNewHotel(hotelInfo, {
      accessToken,
      refreshToken
    });

    const responseDto = new BaseResponseDto<any>();
    responseDto.request_id = 'string';
    responseDto.status = 201;
    responseDto.response_code = 'ROOM_200';
    responseDto.response_message = 'Create Success';
    responseDto.response_description = 'Create new room success';
    responseDto.request_date_time = new Date();
    responseDto.accessToken = newToken.accessToken;
    responseDto.refreshToken = newToken.refreshToken;
    responseDto.data = responseData;
    return response.status(HttpStatus.OK).json(responseDto);
  }
}
