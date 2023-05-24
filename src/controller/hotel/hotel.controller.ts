import { ROLE } from '@app/constants';
import { Roles } from '@app/decorators/roles.decorator';
import { CreateRoomDto } from '@app/dto/room/create.room.dto';
import { TokenPayloadDto } from '@app/dto/token.dto';
import { HotelCreationService } from '@app/services/hotel/hotel.create.service';
import { Body, Controller, Headers, HttpStatus, Post, Response, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { BaseResponseDto } from '../BaseResponseDto';

@ApiTags('rooms')
@Controller('rooms')
export class HotelController {
  constructor(private readonly hotelCreationService: HotelCreationService) {}

  // @UseGuards(AuthenticationGuard)
  // @Roles(ROLE.PROVIDER)
  @Post('new')
  async createNewRoom(@Response() response, @Headers() header: TokenPayloadDto, @Body() roomInfo: CreateRoomDto) {
    const { accessToken, refreshToken } = header;

    const { data: responseData, token: newToken } = await this.hotelCreationService.createNewHotel(roomInfo, {
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
