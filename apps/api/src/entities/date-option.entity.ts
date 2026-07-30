import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { DatePoll } from './date-poll.entity';
import { User } from './user.entity';
import { Availability } from './availability.entity';

@Entity('date_options')
export class DateOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  datePollId: string;

  @Column({ type: 'date', nullable: false })
  date: string;

  @Column({ type: 'uuid', nullable: false })
  creatorId: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @ManyToOne(() => DatePoll, (dp) => dp.options)
  @JoinColumn({ name: 'datePollId' })
  datePoll: DatePoll;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creatorId' })
  creator: User;

  @OneToMany(() => Availability, (a) => a.dateOption)
  availabilities: Availability[];
}
