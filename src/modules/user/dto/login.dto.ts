import { IsNotEmpty, Length } from 'class-validator';

export class UserLoginRequestDto {
  @Length(8, 50, { message: 'Username must contain 8 to 50 characters' })
  @IsNotEmpty({ message: 'Password cannot plank' })
  password: string;

  @Length(3, 50, { message: 'Username must contain 3 to 50 characters' })
  @IsNotEmpty({ message: 'Username cannot plank' })
  username: string;
}
