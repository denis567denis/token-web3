import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from '../application/orders.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('getOrders')
  @UseGuards(AuthGuard('jwt'))
  async getOrders(
    @Query('tokenA') tokenA: string,
    @Query('tokenB') tokenB: string,
    @Query('user') user: string,
    @Query('active') active: boolean = false,
  ) {
    return this.ordersService.getOrders({ tokenA, tokenB, user, active });
  }

  @Get('getMatchingOrders')
  @UseGuards(AuthGuard('jwt'))
  async getMatchingOrders(
    @Query('tokenA') tokenA: string,
    @Query('tokenB') tokenB: string,
    @Query('amountA') amountA: string,
    @Query('amountB') amountB: string,
  ) {
    return this.ordersService.getMatchingOrders({
      tokenA,
      tokenB,
      amountA,
      amountB,
    });
  }
}
