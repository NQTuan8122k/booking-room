import { OptionalProperty } from '@app/shared/utils/validation/decorator';
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
  @OptionalProperty()
  fullname?: string;

  @ApiPropertyOptional()
  @OptionalProperty()
  dateOfBirth?: string;

  @ApiPropertyOptional()
  @OptionalProperty()
  username?: string;

  @ApiPropertyOptional()
  @OptionalProperty()
  phoneNumber?: string;

  @ApiPropertyOptional()
  @OptionalProperty()
  email?: string;

  @ApiPropertyOptional()
  @OptionalProperty()
  address?: string;

  @ApiPropertyOptional()
  @OptionalProperty()
  createAt?: string;

  @ApiPropertyOptional()
  @OptionalProperty()
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
