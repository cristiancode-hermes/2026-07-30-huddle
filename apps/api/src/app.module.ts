import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GroupsModule } from './groups/groups.module';
import { UsersModule } from './users/users.module';
import {
  Activity, ActivityVote, Availability, Comment, DateOption,
  DatePoll, Group, GroupMembership, Hangout, HangoutAttendee, Photo, User,
} from './entities/entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: process.env.DB_PATH || './data/huddle.db',
      entities: [
        Activity, ActivityVote, Availability, Comment, DateOption,
        DatePoll, Group, GroupMembership, Hangout, HangoutAttendee, Photo, User,
      ],
      synchronize: true,
    }),
    AuthModule,
    GroupsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
