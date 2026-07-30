import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { Group } from './group.entity';
import { Activity } from './activity.entity';
import { HangoutAttendee } from './hangout-attendee.entity';
import { Photo } from './photo.entity';
import { Comment } from './comment.entity';

@Entity('hangouts')
export class Hangout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  groupId: string;

  @Column({ type: 'uuid', nullable: false })
  activityId: string;

  @Column({ type: 'uuid', nullable: false })
  dateOptionId: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  time: string | null;

  @Column({ type: 'varchar', length: 200, nullable: true })
  location: string | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({
    type: 'simple-enum',
    enum: ['confirmed', 'cancelled', 'completed'],
    default: 'confirmed',
  })
  status: 'confirmed' | 'cancelled' | 'completed';

  @Column({ type: 'date', nullable: false })
  hangoutDate: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @ManyToOne(() => Group, (g) => g.hangouts)
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @ManyToOne(() => Activity)
  @JoinColumn({ name: 'activityId' })
  activity: Activity;

  @OneToMany(() => HangoutAttendee, (a) => a.hangout)
  attendees: HangoutAttendee[];

  @OneToMany(() => Photo, (p) => p.hangout)
  photos: Photo[];

  @OneToMany(() => Comment, (c) => c.hangout)
  comments: Comment[];
}
