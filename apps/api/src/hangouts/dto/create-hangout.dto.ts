import { IsString, IsOptional } from 'class-validator';

export class CreateHangoutDto {
  @IsString()
  groupId: string;

  @IsString()
  activityId: string;

  @IsString()
  dateOptionId: string;

  @IsString()
  hangoutDate: string;

  @IsString()
  @IsOptional()
  time?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
