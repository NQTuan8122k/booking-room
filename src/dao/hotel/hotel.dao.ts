import { Types } from 'mongoose';

export class HotelDao {
  id: Types.ObjectId;
  title: string;
  description: string;
  mainBackground: string;
  imageSrc: string[];
  rating: number;
  name: string;
  owner: string;
  ownerId: Types.ObjectId;
  price: string;
  unit: string;
  location: string;
  label: string;
  group: string;
  distance: string;
  category: string;

  constructor(props: Partial<HotelDao>) {
    this.id = props.id;
    this.title = props.title || null;
    this.description = props.description || null;
    this.mainBackground = props.mainBackground || null;
    this.imageSrc = props.imageSrc || null;
    this.rating = props.rating || null;
    this.name = props.name || null;
    this.owner = props.owner || null;
    this.ownerId = props.ownerId || null;
    this.price = props.price || null;
    this.unit = props.unit || null;
    this.location = props.location || null;
    this.label = props.label || null;
    this.group = props.group || null;
    this.distance = props.distance || null;
    this.category = props.category || null;
  }
}
