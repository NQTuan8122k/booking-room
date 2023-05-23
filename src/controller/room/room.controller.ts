import { CreateRoomDto } from '@app/dto/room/create.room.dto';
import { RoomCreationService } from '@app/services/room/room.create.service';
import { RoomUpdateService } from '@app/services/room/room.update.service';
import { Body, Controller, HttpStatus, Post, Response, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ROLE } from 'src/constants';
import { Roles } from 'src/decorators/roles.decorator';
import { QueryMeInfoDto } from 'src/dto/user/query.MeInfo.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { JwtTokenService } from 'src/shared/services/JwtTokenService.service';

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
    const res = this.roomCreationService.createNewRoom(data, { accessToken, refreshToken });

    response.status(HttpStatus.CREATED).json({
      request_id: 'string',
      status: 201,
      response_code: 'ROOM_200',
      response_message: 'Create success',
      response_description: 'Create new room success',
      request_date_time: new Date().toISOString(),
      data: res
    });
  }

  @UseGuards(AuthenticationGuard)
  @Post('update')
  async updateRoom(@Response() response, @Body() roomInfo: CreateRoomDto) {
    const { data, accessToken, refreshToken } = roomInfo;
    const res = this.roomUpdateService.updateNewRoom(data, { accessToken, refreshToken });

    response.status(HttpStatus.CREATED).json({
      request_id: 'string',
      status: 201,
      response_code: 'ROOM_200',
      response_message: 'Create success',
      response_description: 'Create new room success',
      request_date_time: new Date().toISOString(),
      data: res
    });
  }
}
