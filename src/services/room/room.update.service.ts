import { CreateRoomDto } from '@app/dto/room/create.room.dto';
import { UpdateRoomDto } from '@app/dto/room/update.room.dto';
import { TokenPayloadDto } from '@app/dto/token.dto';
import { RoomRepository } from '@app/repo/room.repository';
import { JwtTokenService } from '@app/shared/services/JwtTokenService.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class RoomUpdateService {
  constructor(private roomRepository: RoomRepository, private jwtTokenService: JwtTokenService) {}

  async updateNewRoom(room: UpdateRoomDto, token: TokenPayloadDto) {
    const {
      bathroomCount,
      bed,
      bedType,
      category,
      description,
      guestCount,
      hotelId,
      imageSrc,
      locationValue,
      price,
      roomCount,
      _id
      // roomNo
    } = room;

    const dataUpdate = {
      ...(bathroomCount ? { bathroomCount } : {}),
      ...(bed ? { bed } : {}),
      ...(bedType ? { bedType } : {}),
      ...(category ? { category } : {}),
      ...(description ? { description } : {}),
      ...(guestCount ? { guestCount } : {}),
      ...(hotelId ? { hotelId } : {}),
      ...(imageSrc ? { imageSrc } : {}),
      ...(locationValue ? { locationValue } : {}),
      ...(price ? { price } : {}),
      ...(roomCount ? { roomCount } : {})
    } as UpdateRoomDto;

    const roomResponse = await this.roomRepository.updateOne(_id, dataUpdate);

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
