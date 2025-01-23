import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetOrdersDto {
  @ApiPropertyOptional({
    type: String,
  })
  tokenA?: string;

  @ApiPropertyOptional({
    type: String,
  })
  tokenB?: string;

  @ApiPropertyOptional({
    type: String,
  })
  addressUser?: string;

  @ApiPropertyOptional({
    type: Boolean,
    default: false,
  })
  active?: boolean = false;
}
