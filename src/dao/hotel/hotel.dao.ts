import { Types } from 'mongoose';

export class HotelDao {
  _id: Types.ObjectId;
  title: string;
  description: string;
  // mainBackground: string;
  imageSrc: string[];

  constructor(props: Partial<HotelDao>) {
    this._id = props._id;
    this.title = props.title || null;
    this.description = props.description || null;
    this.imageSrc = props.imageSrc || null;
  }
}
