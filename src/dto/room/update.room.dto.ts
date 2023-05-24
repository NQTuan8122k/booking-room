import { OptionalProperty } from '@app/shared/utils/validation/decorator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateRoomDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Id Id is required' })
  _id: string;

  @ApiProperty()
  @OptionalProperty()
  hotelId?: string;

  @ApiPropertyOptional()
  @OptionalProperty()
  description?: string;

  @ApiPropertyOptional()
  @OptionalProperty()
  imageSrc?: string[];

  @ApiPropertyOptional()
  @OptionalProperty()
  category?: string;

  // @ApiPropertyOptional()
  // roomNo: string;

  @ApiPropertyOptional()
  @OptionalProperty()
  roomCount?: string;

  @ApiPropertyOptional()
  @OptionalProperty()
  bathroomCount?: string;

  @ApiPropertyOptional()
  @OptionalProperty()
  bed?: string;

  @ApiPropertyOptional()
  @OptionalProperty()
  bedType?: string;

  @ApiPropertyOptional()
  @OptionalProperty()
  guestCount?: string;

  @ApiPropertyOptional()
  @OptionalProperty()
  locationValue?: string;

  @ApiPropertyOptional()
  @OptionalProperty()
  price?: string;
}
