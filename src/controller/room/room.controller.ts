import { CreateRoomDto } from '@app/dto/room/create.room.dto';
import { RoomService } from '@app/services/room/room.service';
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
  constructor(private readonly roomService: RoomService, private jwtTokenService: JwtTokenService) {}

  @UseGuards(AuthenticationGuard)
  @Post('new')
  async createNewRoom(@Response() response, @Body() roomInfo: CreateRoomDto) {
    const res = { status: 1123 };
    if (res.status === 200) {
      response.status(HttpStatus.OK).json({
        ...res
      });
    } else if (res.status === 400) {
      response.status(HttpStatus.BAD_REQUEST).json({
        ...res
      });
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ...res
      });
    }
  }
}
