import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../entities/group.entity';
import { GroupMembership } from '../entities/group-membership.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
    @InjectRepository(GroupMembership)
    private membershipsRepository: Repository<GroupMembership>,
  ) {}

  async create(dto: CreateGroupDto, userId: string) {
    const group = this.groupsRepository.create(dto as any);
    const savedGroup = (await this.groupsRepository.save(group)) as unknown as Group;

    const membership = this.membershipsRepository.create({
      userId,
      groupId: savedGroup.id,
      role: 'admin',
      status: 'accepted',
    } as any);
    await this.membershipsRepository.save(membership);

    return this.getById(savedGroup.id, userId);
  }

  async getById(id: string, userId: string) {
    const group = await this.groupsRepository.findOne({
      where: { id },
      relations: {
        memberships: { user: true },
      },
    });
    if (!group) throw new NotFoundException('Group not found');

    const isMember = group.memberships?.some(
      (m) => m.userId === userId && m.status === 'accepted',
    );
    if (!isMember) throw new ForbiddenException('Not a member of this group');

    return group;
  }

  async findByUser(userId: string) {
    const memberships = await this.membershipsRepository.find({
      where: { userId, status: 'accepted' },
      relations: { group: true },
    });
    return memberships.map((m) => m.group);
  }

  async update(id: string, dto: UpdateGroupDto, userId: string) {
    await this.isAdmin(id, userId);
    const group = await this.groupsRepository.findOne({ where: { id } });
    if (!group) throw new NotFoundException('Group not found');
    Object.assign(group, dto);
    return (await this.groupsRepository.save(group)) as unknown as Group;
  }

  async remove(id: string, userId: string) {
    await this.isAdmin(id, userId);
    const group = await this.groupsRepository.findOne({ where: { id } });
    if (!group) throw new NotFoundException('Group not found');
    await this.groupsRepository.remove(group);
  }

  async leave(id: string, userId: string) {
    const membership = await this.membershipsRepository.findOne({
      where: { groupId: id, userId },
    });
    if (!membership) throw new NotFoundException('Membership not found');
    await this.membershipsRepository.remove(membership);
  }

  async isAdmin(groupId: string, userId: string) {
    const membership = await this.membershipsRepository.findOne({
      where: { groupId, userId, role: 'admin', status: 'accepted' },
    });
    if (!membership) throw new ForbiddenException('Not an admin');
    return membership;
  }

  async isMember(groupId: string, userId: string) {
    const membership = await this.membershipsRepository.findOne({
      where: { groupId, userId, status: 'accepted' },
    });
    if (!membership) throw new ForbiddenException('Not a member');
    return membership;
  }
}
