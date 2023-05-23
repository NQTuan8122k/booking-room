import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginRequestDto {
  @Length(8, 50, { message: 'Username must contain 8 to 50 characters' })
  @IsNotEmpty({ message: 'Password cannot plank' })
  @ApiProperty()
  password: string;

  @Length(3, 50, { message: 'Username must contain 3 to 50 characters' })
  @IsNotEmpty({ message: 'Username cannot plank' })
  @ApiProperty()
  username: string;
}
