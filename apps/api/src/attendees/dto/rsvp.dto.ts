import { IsString, IsIn } from 'class-validator';

export class RsvpDto {
  @IsString()
  @IsIn(['going', 'maybe', 'pass'])
  response: 'going' | 'maybe' | 'pass';
}
