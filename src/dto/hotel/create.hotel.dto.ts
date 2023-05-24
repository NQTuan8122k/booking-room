import { OptionalProperty } from '@app/shared/utils/validation/decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class HotelCreationDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Hotel Id is required' })
  title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Hotel Id is required' })
  description: string;

  @ApiProperty()
  @OptionalProperty()
  mainBackground: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Hotel Id is required' })
  @IsArray()
  imageSrc: string[];

  @ApiProperty()
  @IsNotEmpty({ message: 'Hotel Id is required' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Hotel Id is required' })
  owner: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Hotel Id is required' })
  ownerId: Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty({ message: 'Hotel Id is required' })
  price: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Hotel Id is required' })
  unit: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Hotel Id is required' })
  location: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Hotel Id is required' })
  label: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Hotel Id is required' })
  group: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Hotel Id is required' })
  distance: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Hotel Id is required' })
  category: string;
}
