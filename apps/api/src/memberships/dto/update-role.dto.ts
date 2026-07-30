import { IsString, IsIn, IsOptional } from 'class-validator';

export class UpdateRoleDto {
  @IsString()
  @IsIn(['admin', 'member'])
  role: 'admin' | 'member';
}
