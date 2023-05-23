import { IsNotEmpty } from 'class-validator';

export class RoomInterface {
  // _id: Types.ObjectId;
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
  @IsNotEmpty({ message: 'Access Token is required' })
  accessToken: string;

  @IsNotEmpty({ message: 'Refresh Token is required' })
  refreshToken: string;

  @IsNotEmpty({ message: 'Missing Data field' })
  data: RoomInterface;
}
