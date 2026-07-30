import { IsArray, IsString, ArrayMinSize } from 'class-validator';

export class CreateDatePollDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  dates: string[];
}
