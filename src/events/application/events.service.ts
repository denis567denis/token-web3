import { Injectable, OnModuleInit } from '@nestjs/common';
import { Web3Service } from '../../web3/application/web3.service';
import { OrdersService } from '../../orders/application/orders.service';

@Injectable()
export class EventsService implements OnModuleInit {
  constructor(
    private web3Service: Web3Service,
    private ordersService: OrdersService,
  ) {}

  async onModuleInit() {
    await this.syncPastEvents();
    this.subscribeToEvents();
  }

  async subscribeToEvents() {
    const contract = this.web3Service.getContract();

    contract.events.OrderCreated({}, async (error, event) => {
      if (error) throw error;
      const { id, tokenA, tokenB, amountA, amountB, user } = event.returnValues;
      await this.ordersService.createOrder({
        orderId: id,
        tokenA,
        tokenB,
        amountA,
        amountB,
        user,
        isActive: true,
      });
    });

    contract.events.OrderMatched({}, async (error, event) => {
      if (error) {
        console.error('Error in OrderMatched event:', error);
        return;
      }

      const { id } = event.returnValues;

      await this.ordersService.updateOrderStatus({
        orderId: id,
        status: {
          isActive: false,
          isFilled: true,
        },
      });
    });

    contract.events.OrderCancelled({}, async (error, event) => {
      if (error) {
        console.error('Error in OrderCancelled event:', error);
        return;
      }

      const { id } = event.returnValues;

      await this.ordersService.updateOrderStatus({
        orderId: id,
        status: {
          isActive: false,
          isFilled: false,
        },
      });
    });
  }

  async syncPastEvents() {
    const orderCreatedEvents =
      await this.web3Service.getPastEvents('OrderCreated');
    const orderMatchedEvents =
      await this.web3Service.getPastEvents('OrderMatched');
    const orderCancelledEvents =
      await this.web3Service.getPastEvents('OrderCancelled');

    for (const event of orderCreatedEvents) {
      const { id, tokenA, tokenB, amountA, amountB, user, isMarket } =
        event.returnValues;
      await this.ordersService.createOrder({
        orderId: id,
        tokenA,
        tokenB,
        amountA,
        amountB,
        user,
        isMarket,
      });
    }

    for (const event of orderMatchedEvents) {
      const { id } = event.returnValues;
      await this.ordersService.updateOrderStatus({
        orderId: id,
        status: {
          isActive: false,
          isFilled: true,
        },
      });
    }

    for (const event of orderCancelledEvents) {
      const { id } = event.returnValues;
      await this.ordersService.updateOrderStatus({
        orderId: id,
        status: {
          isActive: false,
          isFilled: false,
        },
      });
    }
  }
}
