import { Types } from 'mongoose';

export class UserDao {
  id: Types.ObjectId;
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
  updatedAt: string | null;

  constructor(props: Partial<UserDao>) {
    this.id = props.id;
    this.email = props.email || null;
    this.dateOfBirth = props.dateOfBirth || null;
    this.password = props.password || null;
    this.username = props.username || null;
    this.phoneNumber = props.phoneNumber || null;
    this.address = props.address || null;
    this.status = props.status || null;
    this.createAt = props.createAt || null;
    this.lastModify = props.lastModify || null;
    this.role = props.role || null;
    this.updatedAt = props.updatedAt || null;
  }
}
