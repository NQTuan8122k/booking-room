import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { RoleType } from 'src/constants/role-file';

export class UserDataDto {
  @ApiProperty()
  fullname?: string;

  @ApiProperty()
  dateOfBirth?: string;

  @ApiProperty()
  username?: string;

  @ApiProperty()
  phoneNumber?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  address?: string;

  @ApiProperty()
  createAt?: string;

  @ApiProperty()
  role?: RoleType;
}

export interface UserListQueryDto {
  fullname?: string;
  dateOfBirth?: string;
  username?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  createAt?: string;
  role?: RoleType;
}

export class QueryListUerDto {
  @IsNotEmpty({ message: 'AccessToken is required' })
  accessToken: string;

  @IsNotEmpty({ message: 'AccessToken is required' })
  refreshToken: string;

  @IsNotEmpty({ message: 'Missing Data field' })
  data: UserDataDto;
}
