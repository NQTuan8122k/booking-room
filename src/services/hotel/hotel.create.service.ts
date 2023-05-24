import { HotelCreationDto } from '@app/dto/hotel/create.hotel.dto';
import { TokenPayloadDto } from '@app/dto/token.dto';
import { HotelRepository } from '@app/repo/hotel.repository';
import { JwtTokenService } from '@app/shared/services/JwtTokenService.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class HotelCreationService {
  constructor(private hotelRepository: HotelRepository, private jwtTokenService: JwtTokenService) {}

  async createNewHotel(room: HotelCreationDto, token: TokenPayloadDto) {
    const roomResponse = await this.hotelRepository.create(room);

    if (!!roomResponse?.id) {
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
