import { IsString } from 'class-validator';

export class AddDateOptionDto {
  @IsString()
  date: string;
}
