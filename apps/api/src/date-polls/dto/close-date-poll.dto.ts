import { IsString, IsOptional } from 'class-validator';

export class CloseDatePollDto {
  @IsString()
  confirmedDateId: string;
}
