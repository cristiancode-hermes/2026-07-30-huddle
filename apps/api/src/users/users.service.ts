import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async search(query: string) {
    return this.usersRepository.find({
      where: [
        { displayName: Like(`%${query}%`) },
        { email: Like(`%${query}%`) },
      ],
      select: { id: true, email: true, displayName: true, avatarUrl: true },
    });
  }

  async findById(id: string) {
    return this.usersRepository.findOne({
      where: { id },
      select: { id: true, email: true, displayName: true, avatarUrl: true },
    });
  }
}
