import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, MaxLength, MinLength } from 'class-validator';

export class DataDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Full name cannot plank' })
  fullname: string;

  @ApiProperty()
  @MaxLength(150, { message: 'Password must less than 150 characters' })
  @MinLength(8, { message: 'Password must have at least 8 characters' })
  @IsNotEmpty({ message: 'Password cannot plank' })
  password: string;

  @ApiProperty()
  @MaxLength(150, { message: 'Username must less than 150 characters' })
  @IsNotEmpty({ message: 'Username cannot plank' })
  username: string;

  @ApiProperty()
  @Length(10, 10, { message: 'Phone number must be 10 characters' })
  @IsNotEmpty({ message: 'Password cannot plank' })
  phoneNumber: string;

  @IsEmail()
  @ApiProperty()
  @IsNotEmpty({ message: 'Email cannot plank' })
  email: string;

  @ApiProperty()
  @MaxLength(255, { message: 'address must be less than 255 characters' })
  @IsNotEmpty({ message: 'address cannot plank' })
  address: string;
}

export class AdminRegisterDto {
  @IsNotEmpty({ message: 'AccessToken is required' })
  accessToken: string;

  @IsNotEmpty({ message: 'AccessToken is required' })
  refreshToken: string;

  @IsNotEmpty({ message: 'Missing Data field' })
  data: DataDto;
}
