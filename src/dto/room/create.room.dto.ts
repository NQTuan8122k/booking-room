import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class RoomInterface {
  @IsNotEmpty({ message: 'Hotel Id is required' })
  hotelId: string;

  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsNotEmpty({ message: 'ImageSrc is required' })
  imageSrc: string[];

  @IsNotEmpty({ message: 'Category is required' })
  category?: string;

  @IsNotEmpty({ message: 'Category is required' })
  roomNo?: string;

  @IsNotEmpty({ message: 'Room Count is required' })
  roomCount?: string;

  @IsNotEmpty({ message: 'Bathroom Count is required' })
  bathroomCount?: string;

  @IsNotEmpty({ message: 'Bathroom Count is required' })
  bed?: string;

  @IsNotEmpty({ message: 'Bathroom Count is required' })
  bedType?: string;

  @IsNotEmpty({ message: 'Guest Count is required' })
  guestCount: string;

  @IsNotEmpty({ message: 'Location is required' })
  locationValue?: string;

  @IsNotEmpty({ message: 'Price is required' })
  price: string;
}

export class CreateRoomDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Access Token is required' })
  accessToken: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Refresh Token is required' })
  refreshToken: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Missing Data field' })
  @Type(() => RoomInterface)
  @ValidateNested({
    each: true
  })
  data: RoomInterface;
}

// export class CreateRoomDto extends BatchDto<RoomInterface> {
//   @Type(() => RoomInterface)
//   data: RoomInterface;
// }
