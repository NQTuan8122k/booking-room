import { CreateRoomDto } from '@app/dto/room/create.room.dto';
import { UpdateRoomDto } from '@app/dto/room/update.room.dto';
import { TokenPayloadDto } from '@app/dto/token.dto';
import { RoomCreationService } from '@app/services/room/room.create.service';
import { RoomUpdateService } from '@app/services/room/room.update.service';
import { Body, Controller, Headers, HttpStatus, Post, Put, Response, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { BaseResponseDto } from '../BaseResponseDto';
import { ROLE } from '@app/constants';
import { Roles } from '@app/decorators/roles.decorator';

@ApiTags('rooms')
@Controller('rooms')
export class RoomController {
  constructor(
    private readonly roomCreationService: RoomCreationService,
    private readonly roomUpdateService: RoomUpdateService
  ) {}

  @UseGuards(AuthenticationGuard)
  @Roles(ROLE.PROVIDER)
  @Post('new')
  async createNewRoom(@Response() response, @Headers() header: TokenPayloadDto, @Body() roomInfo: CreateRoomDto) {
    const { accessToken, refreshToken } = header;

    const { data: responseData, token: newToken } = await this.roomCreationService.createNewRoom(roomInfo, {
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

  @UseGuards(AuthenticationGuard)
  @Roles(ROLE.PROVIDER)
  @Put('update')
  async updateRoom(@Response() response, @Headers() header: TokenPayloadDto, @Body() roomInfo: UpdateRoomDto) {
    const { accessToken, refreshToken } = header;

    const { data: responseData, token: newToken } = await this.roomUpdateService.updateNewRoom(roomInfo, {
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
