import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../infrastructure/entities/user.entity';
import { UserRepository } from '../infrastructure/repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createOrSignInUser(walletAddress: string) {
    const existingUser =
      await this.userRepository.getUserByWallet(walletAddress);
    if (existingUser) {
      const authToken = await this.jwtService.signAsync(
        { walletAddress: existingUser.walletAddress },
        { expiresIn: parseInt(process.env.JWT_LIFE) },
      );
      return {
        existingUser,
        authToken,
      };
    }

    const user = await this.userRepository.createUser(walletAddress);
    const authToken = await this.jwtService.signAsync(
      { walletAddress: user.walletAddress },
      { expiresIn: parseInt(process.env.JWT_LIFE) },
    );
    return {
      user,
      authToken,
    };
  }

  async getUserByWallet(walletAddress: string) {
    const user = await this.userRepository.getUserByWallet(walletAddress);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
