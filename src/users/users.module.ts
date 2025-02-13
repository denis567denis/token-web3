import { Module } from '@nestjs/common';
import { UsersController } from './presentation/user.controller';
import { UsersService } from './application/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infrastructure/entities/user.entity';
import { UserRepository } from './infrastructure/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
