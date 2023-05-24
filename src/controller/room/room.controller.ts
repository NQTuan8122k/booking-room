import { CreateRoomDto, RoomInterface } from '@app/dto/room/create.room.dto';
import { RoomCreationService } from '@app/services/room/room.create.service';
import { RoomUpdateService } from '@app/services/room/room.update.service';
import { Body, Controller, HttpStatus, Post, Response, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ROLE } from 'src/constants';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { BaseResponseDto } from '../BaseResponseDto';

@ApiTags('rooms')
@Controller('rooms')
export class RoomController {
  constructor(
    private readonly roomCreationService: RoomCreationService,
    private readonly roomUpdateService: RoomUpdateService
  ) {}

  @UseGuards(AuthenticationGuard)
  @Post('new')
  async createNewRoom(@Response() response, @Body() roomInfo: CreateRoomDto) {
    const { data, accessToken, refreshToken } = roomInfo;
    const { data: responseData, token: newToken } = await this.roomCreationService.createNewRoom(data, {
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

  // @UseGuards(AuthenticationGuard)
  @Post('update')
  async updateRoom(@Response() response, @Body() roomInfo: CreateRoomDto) {
    const { data, accessToken, refreshToken } = roomInfo;
    const { data: responseData, token: newToken } = await this.roomUpdateService.updateNewRoom(data, {
      accessToken,
      refreshToken
    });

    const responseDto = new BaseResponseDto<any>();
    responseDto.request_id = 'string';
    responseDto.status = 200;
    responseDto.response_code = 'ROOM_200';
    responseDto.response_message = 'Update Success';
    responseDto.response_description = 'Update room success';
    responseDto.request_date_time = new Date();
    responseDto.accessToken = newToken.accessToken;
    responseDto.refreshToken = newToken.refreshToken;
    responseDto.data = responseData;
    return response.status(HttpStatus.OK).json(responseDto);
  }
}
