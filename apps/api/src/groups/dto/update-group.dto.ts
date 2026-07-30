import { IsString, IsOptional, MaxLength, MinLength } from 'class-validator';

export class UpdateGroupDto {
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(50)
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  coverUrl?: string;
}
