import { IsIn, IsOptional } from 'class-validator';

export class VoteDto {
  @IsOptional()
  @IsIn(['up', 'down', null])
  direction: 'up' | 'down' | null;
}
