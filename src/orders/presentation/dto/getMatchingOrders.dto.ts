import { ApiProperty } from '@nestjs/swagger';

export class GetMatchingOrdersDto {
  @ApiProperty({
    type: String,
  })
  tokenA: string;

  @ApiProperty({
    type: String,
  })
  tokenB: string;

  @ApiProperty({
    type: String,
  })
  amountA: string;

  @ApiProperty({
    type: String,
  })
  amountB: string;
}
