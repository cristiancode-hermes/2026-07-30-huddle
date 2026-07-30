import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToOne, JoinColumn, Unique,
} from 'typeorm';
import { User } from './user.entity';
import { Group } from './group.entity';

@Entity('group_memberships')
@Unique(['userId', 'groupId'])
export class GroupMembership {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'uuid', nullable: false })
  groupId: string;

  @Column({ type: 'simple-enum', enum: ['admin', 'member'], default: 'member' })
  role: 'admin' | 'member';

  @Column({ type: 'simple-enum', enum: ['pending', 'accepted', 'declined'], default: 'pending' })
  status: 'pending' | 'accepted' | 'declined';

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @ManyToOne(() => User, (u) => u.memberships)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Group, (g) => g.memberships)
  @JoinColumn({ name: 'groupId' })
  group: Group;
}
