import { Module } from '@nestjs/common';
import { EventsService } from './application/events.service';
import { Web3Module } from '../web3/web3.module';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [Web3Module, OrdersModule],
  providers: [EventsService],
})
export class EventsModule {}
