import { Types } from 'mongoose';

export class ResponseAdminAuthDto {
  _id: Types.ObjectId;
  fullname: string;
  username: string;
  status: string;
  createAt: string;
  lastModify: string | null;
  role: string;
  phoneNumber: string;
  email: string;
  address: string;

  constructor(props: Partial<ResponseAdminAuthDto>) {
    this._id = props._id;
    this.username = props.username || null;
    this.fullname = props.fullname || null;
    this.status = props.status || null;
    this.createAt = props.createAt || null;
    this.lastModify = props.lastModify || null;
    this.role = props.role || null;
    this.phoneNumber = props.phoneNumber || null;
    this.email = props.email || null;
    this.address = props.address || null;
  }
}
