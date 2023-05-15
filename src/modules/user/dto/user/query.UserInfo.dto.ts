import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class QueryUserInfoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'accessToken is required' })
  accessToken: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'accessToken is required' })
  refreshToken: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Missing data field' })
  data: {
    username: string;
  };
}
