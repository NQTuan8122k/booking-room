import { IsNotEmpty } from 'class-validator';

type IPlanObject = {
  [key: string]: string;
};

export class QueryMeInfoDto {
  @IsNotEmpty({ message: 'AccessToken is required' })
  accessToken: string;

  @IsNotEmpty({ message: 'AccessToken is required' })
  refreshToken: string;

  @IsNotEmpty({ message: 'Missing Data field' })
  data: IPlanObject;
}
