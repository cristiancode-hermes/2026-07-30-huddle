import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { Activity } from './activity.entity';
import { DateOption } from './date-option.entity';

@Entity('date_polls')
export class DatePoll {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false, unique: true })
  activityId: string;

  @Column({ type: 'simple-enum', enum: ['open', 'closed'], default: 'open' })
  status: 'open' | 'closed';

  @Column({ type: 'uuid', nullable: true })
  confirmedDateOptionId: string | null;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @ManyToOne(() => Activity, (a) => a.datePolls)
  @JoinColumn({ name: 'activityId' })
  activity: Activity;

  @OneToMany(() => DateOption, (d) => d.datePoll)
  options: DateOption[];
}
