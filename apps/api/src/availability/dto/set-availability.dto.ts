import { IsString, IsIn } from 'class-validator';

export class SetAvailabilityDto {
  @IsString()
  @IsIn(['yes', 'maybe', 'no'])
  response: 'yes' | 'maybe' | 'no';
}
