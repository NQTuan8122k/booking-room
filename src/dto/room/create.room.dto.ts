import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Hotel Id is required' })
  hotelId: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'ImageSrc is required' })
  imageSrc: string[];

  @ApiProperty()
  @IsNotEmpty({ message: 'Category is required' })
  category: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Category is required' })
  roomNo: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Room Count is required' })
  roomCount: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Bathroom Count is required' })
  bathroomCount: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Bathroom Count is required' })
  bed: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Bathroom Count is required' })
  bedType: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Guest Count is required' })
  guestCount: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Location is required' })
  locationValue: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Price is required' })
  price: string;
}
