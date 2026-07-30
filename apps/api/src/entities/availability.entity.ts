import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  ManyToOne, JoinColumn, Unique,
} from 'typeorm';
import { DateOption } from './date-option.entity';
import { User } from './user.entity';

@Entity('availabilities')
@Unique(['dateOptionId', 'userId'])
export class Availability {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  dateOptionId: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'simple-enum', enum: ['yes', 'maybe', 'no'] })
  response: 'yes' | 'maybe' | 'no';

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @ManyToOne(() => DateOption, (d) => d.availabilities)
  @JoinColumn({ name: 'dateOptionId' })
  dateOption: DateOption;

  @ManyToOne(() => User, (u) => u.availabilities)
  @JoinColumn({ name: 'userId' })
  user: User;
}
