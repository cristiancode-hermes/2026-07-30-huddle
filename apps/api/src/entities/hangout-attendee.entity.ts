import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  ManyToOne, JoinColumn, Unique,
} from 'typeorm';
import { Hangout } from './hangout.entity';
import { User } from './user.entity';

@Entity('hangout_attendees')
@Unique(['hangoutId', 'userId'])
export class HangoutAttendee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  hangoutId: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'simple-enum', enum: ['going', 'maybe', 'pass'] })
  response: 'going' | 'maybe' | 'pass';

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @ManyToOne(() => Hangout, (h) => h.attendees)
  @JoinColumn({ name: 'hangoutId' })
  hangout: Hangout;

  @ManyToOne(() => User, (u) => u.attendances)
  @JoinColumn({ name: 'userId' })
  user: User;
}
