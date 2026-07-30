import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToOne, JoinColumn, Unique,
} from 'typeorm';
import { Activity } from './activity.entity';
import { User } from './user.entity';

@Entity('activity_votes')
@Unique(['activityId', 'userId'])
export class ActivityVote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  activityId: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'simple-enum', enum: ['up', 'down'] })
  direction: 'up' | 'down';

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @ManyToOne(() => Activity, (a) => a.votes)
  @JoinColumn({ name: 'activityId' })
  activity: Activity;

  @ManyToOne(() => User, (u) => u.votes)
  @JoinColumn({ name: 'userId' })
  user: User;
}
