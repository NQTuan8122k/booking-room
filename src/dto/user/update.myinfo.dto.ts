import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateMyInfoDto {
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
}
