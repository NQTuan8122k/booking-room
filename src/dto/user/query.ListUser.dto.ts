import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { RoleType } from 'src/constants/role-file';

export class UserDataDto {
  @ApiPropertyOptional()
  fullname?: string;

  @ApiPropertyOptional()
  dateOfBirth?: string;

  @ApiPropertyOptional()
  username?: string;

  @ApiPropertyOptional()
  phoneNumber?: string;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  address?: string;

  @ApiPropertyOptional()
  createAt?: string;

  @ApiPropertyOptional()
  role?: RoleType;
}

export class UserListQueryDto {
  @ApiPropertyOptional()
  fullname?: string;

  @ApiPropertyOptional()
  dateOfBirth?: string;

  @ApiPropertyOptional()
  username?: string;

  @ApiPropertyOptional()
  phoneNumber?: string;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  address?: string;

  @ApiPropertyOptional()
  createAt?: string;

  @ApiPropertyOptional()
  role?: RoleType;
}

export class QueryListUerDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'AccessToken is required' })
  accessToken: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'AccessToken is required' })
  refreshToken: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Missing Data field' })
  @Type(() => UserDataDto)
  @ValidateNested({
    each: true
  })
  data: UserDataDto;
}
