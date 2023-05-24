import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

type IPlanObject = {
  [key: string]: string;
};

export class QueryMeInfoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'AccessToken is required' })
  accessToken: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'AccessToken is required' })
  refreshToken: string;

  @ApiPropertyOptional()
  @IsNotEmpty({ message: 'Missing Data field' })
  data: IPlanObject;
}
