import { IsString, IsIn } from 'class-validator';

export class HandleInvitationDto {
  @IsString()
  @IsIn(['accepted', 'declined'])
  status: 'accepted' | 'declined';
}
