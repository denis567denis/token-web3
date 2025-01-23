import { Module } from '@nestjs/common';
import { OrdersController } from './presentation/orders.controller';
import { OrdersService } from './application/orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './infrastructure/entities/order.entity';
import { UsersModule } from 'src/users/users.module';
import { OrdersRepository } from './infrastructure/repositories/orders.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity]), UsersModule],
  exports: [OrdersService],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
