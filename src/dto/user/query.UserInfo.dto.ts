import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

class dataInfo {
  @ApiProperty()
  @IsNotEmpty({ message: 'username is required' })
  username: string;
}

export class QueryUserInfoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'accessToken is required' })
  accessToken: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'accessToken is required' })
  refreshToken: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Missing data field' })
  @Type(() => dataInfo)
  @ValidateNested({
    each: true
  })
  data: dataInfo;
}
