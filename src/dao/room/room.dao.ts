import { Types } from 'mongoose';

export class RoomDao {
  _id: Types.ObjectId;
  hotelId: Types.ObjectId;
  title: string;
  description: string;
  imageSrc: string[];
  createdAt: string;
  category: string;
  roomCount: string;
  bathroomCount: string;
  guestCount: string;
  locationValue: string;
  price: string;
  updateAt: string;
  bed: string;
  bedType: string;

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
    this.updateAt = props.updateAt || null;
    this.bed = props.bed || null;
    this.bedType = props.bedType || null;
  }
}
