import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { Group } from './group.entity';
import { User } from './user.entity';
import { ActivityVote } from './activity-vote.entity';
import { DatePoll } from './date-poll.entity';

@Entity('activities')
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  groupId: string;

  @Column({ type: 'uuid', nullable: false })
  authorId: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', length: 30, nullable: false })
  category: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  location: string | null;

  @Column({ type: 'integer', default: 0 })
  netVotes: number;

  @Column({ type: 'integer', default: 0 })
  upvotes: number;

  @Column({ type: 'integer', default: 0 })
  downvotes: number;

  @Column({
    type: 'simple-enum',
    enum: ['suggested', 'planned', 'cancelled'],
    default: 'suggested',
  })
  status: 'suggested' | 'planned' | 'cancelled';

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @ManyToOne(() => Group, (g) => g.activities)
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @ManyToOne(() => User, (u) => u.memberships)
  @JoinColumn({ name: 'authorId' })
  author: User;

  @OneToMany(() => ActivityVote, (v) => v.activity)
  votes: ActivityVote[];

  @OneToMany(() => DatePoll, (dp) => dp.activity)
  datePolls: DatePoll[];
}
