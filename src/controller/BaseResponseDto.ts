import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BaseResponseDto<T> {
  @ApiProperty()
  request_id: string;

  @ApiProperty()
  status: number;

  @ApiProperty()
  response_code: string;

  @ApiProperty()
  response_message: string;

  @ApiProperty()
  response_description: string;

  @ApiProperty()
  request_date_time: Date;

  @ApiPropertyOptional()
  accessToken?: string;

  @ApiPropertyOptional()
  refreshToken?: string;

  @ApiProperty()
  data: T;
}
