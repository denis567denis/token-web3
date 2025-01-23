import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../infrastructure/repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(
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
        user: existingUser,
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
