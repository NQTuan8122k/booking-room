import { Types } from 'mongoose';

export class RoomDao {
  _id: Types.ObjectId;
  hotelId: Types.ObjectId;
  title: string;
  description: string;
  imageSrc: string[];
  createdAt: Date;
  category: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
  price: number;

  constructor(props: Partial<RoomDao>) {
    this._id = props._id;
    this.hotelId = props.hotelId || null;
    this.title = props.title || null;
    this.description = props.description || null;
    this.imageSrc = props.imageSrc || null;
    this.createdAt = props.createdAt || null;
    this.category = props.category || null;
    this.roomCount = props.roomCount || null;
    this.bathroomCount = props.bathroomCount || null;
    this.guestCount = props.guestCount || null;
    this.locationValue = props.locationValue || null;
    this.price = props.price || null;
  }
}
