import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async getUserByWallet(walletAddress: string) {
    return this.userRepository.findOne({
      where: { walletAddress },
    });
  }

  public async createUser(walletAddress: string) {
    const newUser = this.userRepository.create({ walletAddress });
    return this.userRepository.save(newUser);
  }
}
