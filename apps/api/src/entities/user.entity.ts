import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { GroupMembership } from './group-membership.entity';
import { ActivityVote } from './activity-vote.entity';
import { Availability } from './availability.entity';
import { HangoutAttendee } from './hangout-attendee.entity';
import { Photo } from './photo.entity';
import { Comment } from './comment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  displayName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  passwordHash: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  avatarUrl: string | null;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @OneToMany(() => GroupMembership, (m) => m.user)
  memberships: GroupMembership[];

  @OneToMany(() => ActivityVote, (v) => v.user)
  votes: ActivityVote[];

  @OneToMany(() => Availability, (a) => a.user)
  availabilities: Availability[];

  @OneToMany(() => HangoutAttendee, (a) => a.user)
  attendances: HangoutAttendee[];

  @OneToMany(() => Photo, (p) => p.user)
  photos: Photo[];

  @OneToMany(() => Comment, (c) => c.user)
  comments: Comment[];
}
