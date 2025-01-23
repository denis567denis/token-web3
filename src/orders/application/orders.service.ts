import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { OrderEntity } from '../infrastructure/entities/order.entity';
import {
  CancelOrderInterface,
  CreateOrderInterface,
  GetMatchingOrdersInterface,
  GetOrdersInterface,
  UpdateOrderStatusInterface,
} from './orders.service.interface';
import { OrdersRepository } from '../infrastructure/repositories/orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createOrder(order: CreateOrderInterface) {
    await this.cacheManager.clear();
    const existingOrder = await this.ordersRepository.getOrderByOrderId(
      order.orderId,
    );
    if (existingOrder) {
      return existingOrder;
    }

    return this.ordersRepository.createOrder(order);
  }

  async getOrders(filter: GetOrdersInterface) {
    const cacheKey = `orders_${JSON.stringify(filter)}`;

    const cachedOrders = await this.cacheManager.get<OrderEntity[]>(cacheKey);
    if (cachedOrders) {
      return cachedOrders;
    }
    const orders = await this.ordersRepository.getOrders(filter);

    await this.cacheManager.set(cacheKey, orders);

    return orders;
  }

  async getMatchingOrders(filter: GetMatchingOrdersInterface) {
    const cacheKey = `matching_orders_${JSON.stringify(filter)}`;

    const cachedMatchingOrders =
      await this.cacheManager.get<string[]>(cacheKey);
    if (cachedMatchingOrders) {
      return cachedMatchingOrders;
    }

    const orderIds = await this.ordersRepository.getMatchingOrders(filter);

    await this.cacheManager.set(cacheKey, orderIds);

    return orderIds;
  }

  async cancelOrder({ orderId }: CancelOrderInterface) {
    await this.cacheManager.clear();
    await this.ordersRepository.updateOrderStatus({
      orderId,
      status: { isActive: false },
    });
  }

  async updateOrderStatus({ orderId, status }: UpdateOrderStatusInterface) {
    await this.cacheManager.clear();
    await this.ordersRepository.updateOrderStatus({ orderId, status });
  }
}
