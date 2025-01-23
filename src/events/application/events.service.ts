import { Injectable, OnModuleInit } from '@nestjs/common';
import { Web3Service } from '../../web3/application/web3.service';
import { OrdersService } from '../../orders/application/orders.service';

@Injectable()
export class EventsService implements OnModuleInit {
  constructor(
    private web3Service: Web3Service,
    private ordersService: OrdersService,
  ) {
    this.setupEventListeners();
  }

  async onModuleInit() {
    await this.handleOrderEvents();
  }

  private async handleEvent(
    eventType: string,
    handler: (event: any) => Promise<void>,
  ) {
    const contract = this.web3Service.getContract();

    contract.events[eventType]({}, async (error, event) => {
      if (error) {
        console.error(`Error in ${eventType} event:`, error);
        return;
      }

      try {
        await handler(event);
      } catch (err) {
        console.error(`Error processing ${eventType} event:`, err);
      }
    });
  }

  private async processEvents(
    events: any[],
    handler: (event: any) => Promise<void>,
  ) {
    await Promise.allSettled(events.map((event) => handler(event)));
  }

  setupEventListeners() {
    this.handleEvent('OrderCreated', this.handleOrderCreated.bind(this));
    this.handleEvent('OrderMatched', this.handleOrderMatched.bind(this));
    this.handleEvent('OrderCancelled', this.handleOrderCancelled.bind(this));
  }

  async handleOrderEvents() {
    const [orderCreatedEvents, orderMatchedEvents, orderCancelledEvents] =
      await Promise.all([
        this.web3Service.getPastEvents('OrderCreated'),
        this.web3Service.getPastEvents('OrderMatched'),
        this.web3Service.getPastEvents('OrderCancelled'),
      ]);

    await this.processEvents(
      orderCreatedEvents,
      this.handleOrderCreated.bind(this),
    );
    await this.processEvents(
      orderMatchedEvents,
      this.handleOrderMatched.bind(this),
    );
    await this.processEvents(
      orderCancelledEvents,
      this.handleOrderCancelled.bind(this),
    );
  }

  private async handleOrderCreated(event: any) {
    const { id, tokenA, tokenB, amountA, amountB, user, isMarket } =
      event.returnValues;
    await this.ordersService.createOrder({
      orderId: id,
      tokenA,
      tokenB,
      amountA,
      amountB,
      addressUser: user,
      isMarket,
    });
  }

  private async handleOrderMatched(event: any) {
    const { id } = event.returnValues;
    await this.updateOrderStatus(id, false, true);
  }

  private async handleOrderCancelled(event: any) {
    const { id } = event.returnValues;
    await this.updateOrderStatus(id, false, false);
  }

  private async updateOrderStatus(
    orderId: string,
    isActive: boolean,
    isFilled: boolean,
  ) {
    await this.ordersService.updateOrderStatus({
      orderId,
      status: { isActive, isFilled },
    });
  }
}
