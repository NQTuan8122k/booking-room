import { IsNotEmpty } from 'class-validator';

export class UpdateRoomInterface {
  @IsNotEmpty({ message: 'Id Id is required' })
  id: string;

  hotelId?: string;

  description?: string;

  imageSrc?: string[];

  category?: string;

  roomNo?: string;

  roomCount?: string;

  bathroomCount?: string;

  bed?: string;

  bedType?: string;

  guestCount?: string;

  locationValue?: string;

  price?: string;
}
