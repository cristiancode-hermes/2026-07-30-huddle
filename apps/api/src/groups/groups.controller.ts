import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@ApiTags('groups')
@Controller('groups')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Get()
  findAll(@CurrentUser() user: { id: string }) {
    return this.groupsService.findByUser(user.id);
  }

  @Post()
  create(
    @Body() dto: CreateGroupDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.groupsService.create(dto, user.id);
  }

  @Get(':id')
  getById(
    @Param('id') id: string,
    @CurrentUser() user: { id: string },
  ) {
    return this.groupsService.getById(id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateGroupDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.groupsService.update(id, dto, user.id);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @CurrentUser() user: { id: string },
  ) {
    return this.groupsService.remove(id, user.id);
  }

  @Post(':groupId/leave')
  leave(
    @Param('groupId') groupId: string,
    @CurrentUser() user: { id: string },
  ) {
    return this.groupsService.leave(groupId, user.id);
  }
}
