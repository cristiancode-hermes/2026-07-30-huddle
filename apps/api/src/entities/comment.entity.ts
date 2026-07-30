import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToOne, JoinColumn,
} from 'typeorm';
import { Hangout } from './hangout.entity';
import { User } from './user.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  hangoutId: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'text', nullable: false })
  text: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @ManyToOne(() => Hangout, (h) => h.comments)
  @JoinColumn({ name: 'hangoutId' })
  hangout: Hangout;

  @ManyToOne(() => User, (u) => u.comments)
  @JoinColumn({ name: 'userId' })
  user: User;
}
