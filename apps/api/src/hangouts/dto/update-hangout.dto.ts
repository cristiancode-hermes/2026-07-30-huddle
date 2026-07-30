import { IsString, IsOptional } from 'class-validator';

export class UpdateHangoutDto {
  @IsString()
  @IsOptional()
  time?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  hangoutDate?: string;
}
