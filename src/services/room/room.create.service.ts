import { RoomInterface } from '@app/dto/room/create.room.dto';
import { TokenPayloadDto } from '@app/dto/token.dto';
import { RoomRepository } from '@app/repo/room.repository';
import { JwtTokenService } from '@app/shared/services/JwtTokenService.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class RoomCreationService {
  constructor(private roomRepository: RoomRepository, private jwtTokenService: JwtTokenService) {}

  async createNewRoom(room: RoomInterface, token: TokenPayloadDto) {
    const roomResponse = await this.roomRepository.create(room);

    if (!!roomResponse?._id) {
      const newToken = await this.jwtTokenService.generationNewToken(token);

      return { data: roomResponse, token: newToken };
    }
    throw new HttpException(
      {
        status: 500,
        description: 'Internal server error when create new room',
        error_message: 'Internal server error when create new room',
        error_detail: null,
        timestamp: new Date().toISOString()
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
