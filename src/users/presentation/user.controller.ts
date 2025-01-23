import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { UsersService } from '../application/user.service';
import { AuthGuard } from '@nestjs/passport';
import { WalletAddress } from 'src/libs/decorator/user.decorators';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto, CreateUserResultDto } from './dtos/createUser.dto';
import { UserDto } from './dtos/user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/auth')
  @ApiResponse({
    status: 201,
    description: 'create user or auth user',
    type: CreateUserResultDto,
  })
  async createUser(@Body() user: CreateUserDto) {
    return this.usersService.createOrSignInUser(user.walletAddress);
  }

  @Get('/info')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'return user', type: UserDto })
  @ApiBearerAuth('JWT-auth')
  async getUser(@WalletAddress() walletAddress: string) {
    return this.usersService.getUserByWallet(walletAddress);
  }
}
