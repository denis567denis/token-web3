import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from '../application/orders.service';
import { AuthGuard } from '@nestjs/passport';
import { OrderDto } from './dto/order.dto';
import { GetMatchingOrdersDto } from './dto/getMatchingOrders.dto';
import { GetOrdersDto } from './dto/getOrders.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('getOrders')
  @ApiResponse({
    status: 200,
    type: [OrderDto],
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  async getOrders(@Query() filter: GetOrdersDto) {
    return this.ordersService.getOrders(filter);
  }

  @Get('getMatchingOrders')
  @ApiResponse({
    status: 200,
    type: [String],
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  async getMatchingOrders(@Query() filter: GetMatchingOrdersDto) {
    return this.ordersService.getMatchingOrders(filter);
  }
}
