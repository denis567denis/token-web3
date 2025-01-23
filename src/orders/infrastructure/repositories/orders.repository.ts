import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import {
  CreateOrderInterface,
  GetMatchingOrdersInterface,
  GetOrdersInterface,
  UpdateOrderStatusInterface,
} from './orders.repository.interface';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private orderEntity: Repository<OrderEntity>,
  ) {}

  public async getOrderByOrderId(orderId: string) {
    return this.orderEntity.findOne({
      where: { orderId },
    });
  }

  public async getOrders(filter: GetOrdersInterface) {
    const query = this.orderEntity.createQueryBuilder('order');

    if (filter.tokenA) {
      query.andWhere('order.tokenA = :tokenA', { tokenA: filter.tokenA });
    }
    if (filter.tokenB) {
      query.andWhere('order.tokenB = :tokenB', { tokenB: filter.tokenB });
    }
    if (filter.addressUser) {
      query.andWhere('order.addressUser = :addressUser', {
        addressUser: filter.addressUser,
      });
    }
    if (filter.active !== undefined) {
      query.andWhere('order.isActive = :active', { active: filter.active });
    }

    return query.getMany();
  }

  public async getMatchingOrders(filter: GetMatchingOrdersInterface) {
    const { tokenA, tokenB, amountA, amountB } = filter;

    const query = this.orderEntity
      .createQueryBuilder('order')
      .where('order.tokenA = :tokenA', { tokenA })
      .andWhere('order.tokenB = :tokenB', { tokenB })
      .andWhere('order.isActive = :active', { active: true });

    if (amountA === '0') {
      query.andWhere('order.amountB <= :amountB', { amountB });
    } else {
      query
        .andWhere('order.amountA >= :amountA', { amountA })
        .andWhere('order.amountB <= :amountB', { amountB });
    }

    const matchingOrders = await query.getMany();

    const orderIds = matchingOrders.map((order) => order.orderId);
    return orderIds;
  }

  public async createOrder(order: CreateOrderInterface) {
    const newOrder = this.orderEntity.create(order);
    return this.orderEntity.save(newOrder);
  }

  public async updateOrderStatus({
    orderId,
    status,
  }: UpdateOrderStatusInterface) {
    return this.orderEntity.update({ orderId }, status);
  }
}
