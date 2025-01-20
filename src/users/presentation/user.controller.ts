import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { UsersService } from '../application/user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/auth')
  async createUser(@Body('walletAddress') walletAddress: string) {
    return this.usersService.createOrSignInUser(walletAddress);
  }

  @Get('/:walletAddress')
  async getUser(@Param('walletAddress') walletAddress: string) {
    const user = await this.usersService.getUserByWallet(walletAddress);
    if (!user) {
      return false;
    }
    return true;
  }
}
