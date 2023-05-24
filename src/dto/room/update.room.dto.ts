import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateRoomInterface {
  @ApiProperty()
  @IsNotEmpty({ message: 'Id Id is required' })
  id: string;

  @ApiPropertyOptional()
  hotelId?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  imageSrc?: string[];

  @ApiPropertyOptional()
  category?: string;

  @ApiPropertyOptional()
  roomNo?: string;

  @ApiPropertyOptional()
  roomCount?: string;

  @ApiPropertyOptional()
  bathroomCount?: string;

  @ApiPropertyOptional()
  bed?: string;

  @ApiPropertyOptional()
  bedType?: string;

  @ApiPropertyOptional()
  guestCount?: string;

  @ApiPropertyOptional()
  locationValue?: string;

  @ApiPropertyOptional()
  price?: string;
}
