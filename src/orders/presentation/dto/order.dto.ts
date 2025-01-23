import { ApiProperty } from '@nestjs/swagger';
import { OrderEntity } from 'src/orders/infrastructure/entities/order.entity';

export class OrderDto extends OrderEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  orderId: string;

  @ApiProperty()
  tokenA: string;

  @ApiProperty()
  tokenB: string;

  @ApiProperty()
  amountA: string;

  @ApiProperty()
  amountB: string;

  @ApiProperty()
  addressUser: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isMarket: boolean;

  @ApiProperty()
  isFilled: boolean;
}
