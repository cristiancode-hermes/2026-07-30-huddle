import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToOne, JoinColumn,
} from 'typeorm';
import { Hangout } from './hangout.entity';
import { User } from './user.entity';

@Entity('photos')
export class Photo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  hangoutId: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  imageUrl: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @ManyToOne(() => Hangout, (h) => h.photos)
  @JoinColumn({ name: 'hangoutId' })
  hangout: Hangout;

  @ManyToOne(() => User, (u) => u.photos)
  @JoinColumn({ name: 'userId' })
  user: User;
}
