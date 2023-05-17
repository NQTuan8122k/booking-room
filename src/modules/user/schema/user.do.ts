import { Types } from 'mongoose';

export class UserDo {
  _id: Types.ObjectId;
  fullname: string;
  dateOfBirth: string;
  password: string;
  username: string;
  phoneNumber: string;
  email: string;
  address: string;
  status: string;
  createAt: string;
  lastModify: string | null;
  role: string;

  constructor(props: Partial<UserDo>) {
    this._id = props._id;
    this.email = props.email || null;
    this.dateOfBirth = props.dateOfBirth || null;
    this.password = props.password || null;
    this.username = props.username || null;
    this.phoneNumber = props.phoneNumber || null;
    this.email = props.email || null;
    this.address = props.address || null;
    this.status = props.status || null;
    this.createAt = props.createAt || null;
    this.lastModify = props.lastModify || null;
    this.role = props.role || null;
  }
}
