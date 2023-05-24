import { Types } from 'mongoose';

export class ResponseUserAuthDto {
  id: Types.ObjectId;
  fullname: string;
  dateOfBirth: string;
  username: string;
  phoneNumber: string;
  email: string;
  address: string;
  status: string;
  createAt: string;
  lastModify: string | null;
  role: string;

  constructor(props: Partial<ResponseUserAuthDto>) {
    this.id = props.id;
    this.email = props.email || null;
    this.dateOfBirth = props.dateOfBirth || null;
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
