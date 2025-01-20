export interface CreateOrderInterface {
  orderId: string;
  tokenA: string;
  tokenB: string;
  amountA: string;
  amountB: string;
  user: string;
  isActive?: boolean;
  isMarket?: boolean;
  isFilled?: boolean;
}

export interface GetOrdersInterface {
  tokenA?: string;
  tokenB?: string;
  user?: string;
  active?: boolean;
}

export interface GetMatchingOrdersInterface {
  tokenA: string;
  tokenB: string;
  amountA: string;
  amountB: string;
}

export interface UpdateOrderStatusInterface {
  orderId: string;
  status: {
    isActive?: boolean;
    isMarket?: boolean;
    isFilled?: boolean;
  };
}
