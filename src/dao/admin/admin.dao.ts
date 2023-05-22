import { Types } from 'mongoose';

export class AdminDao {
  _id: Types.ObjectId;
  fullname: string;
  password: string;
  username: string;
  status: string;
  createAt: string;
  lastModify: string | null;
  role: string;
  phoneNumber: string;
  email: string;
  address: string;

  constructor(props: Partial<AdminDao>) {
    this._id = props._id;
    this.password = props.password || null;
    this.username = props.username || null;
    this.status = props.status || null;
    this.createAt = props.createAt || null;
    this.lastModify = props.lastModify || null;
    this.role = props.role || null;
    this.phoneNumber = props.phoneNumber || null;
    this.email = props.email || null;
    this.address = props.address || null;
  }
}
