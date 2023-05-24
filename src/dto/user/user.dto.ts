import { RoleType } from '@app/constants/role-file';
import { UserRoleMatch } from '@app/shared/utils/validation/decorator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';

export class UserRegisterDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Full name cannot plank' })
  @IsString()
  @Length(1, 100, { message: "fullname's length must in range 1-100" })
  fullname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Date of birth cannot plank' })
  dateOfBirth: string;

  @ApiProperty()
  @IsString()
  @Length(8, 50, { message: 'Password must have 8-50 characters' })
  @IsNotEmpty({ message: 'Password cannot plank' })
  password: string;

  @ApiProperty()
  @IsString()
  @Length(3, 100, { message: 'Username must have 1-150 characters' })
  @IsNotEmpty({ message: 'Username cannot plank' })
  username: string;

  @ApiProperty()
  @IsString()
  @Length(10, 10, { message: 'Phone number must be 10 characters' })
  @IsNotEmpty({ message: 'Password cannot plank' })
  phoneNumber: string;

  @IsEmail()
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Email cannot plank' })
  email: string;

  @ApiProperty()
  @IsString()
  @Length(1, 255, { message: 'address must be less than 255 characters' })
  @IsNotEmpty({ message: 'address cannot plank' })
  address: string;

  @ApiPropertyOptional()
  createAt?: string;

  @ApiProperty()
  @IsString()
  @UserRoleMatch([RoleType.PROVIDER, RoleType.USER], {
    message: `User role must be ${RoleType.USER} or ${RoleType.PROVIDER}`
  })
  @IsNotEmpty({ message: 'address cannot plank' })
  role: RoleType.PROVIDER | RoleType.USER;
}
