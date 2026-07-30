import { IsString, IsOptional } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  category: string;

  @IsString()
  @IsOptional()
  location?: string;
}
