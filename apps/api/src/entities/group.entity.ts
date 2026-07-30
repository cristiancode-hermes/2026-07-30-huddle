import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { GroupMembership } from './group-membership.entity';
import { Activity } from './activity.entity';
import { Hangout } from './hangout.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  coverUrl: string | null;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @OneToMany(() => GroupMembership, (m) => m.group)
  memberships: GroupMembership[];

  @OneToMany(() => Activity, (a) => a.group)
  activities: Activity[];

  @OneToMany(() => Hangout, (h) => h.group)
  hangouts: Hangout[];
}
