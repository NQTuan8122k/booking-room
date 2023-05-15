import { IsNotEmpty } from 'class-validator';

// type IPlanObject = {};

export class QueryMeInfoDto<TData> {
  @IsNotEmpty({ message: 'AccessToken is required' })
  accessToken: string;

  @IsNotEmpty({ message: 'AccessToken is required' })
  refreshToken: string;

  @IsNotEmpty({ message: 'Missing Data field' })
  data: TData;
}
