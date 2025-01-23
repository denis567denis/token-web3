export interface CreateOrderInterface {
  orderId: string;
  tokenA: string;
  tokenB: string;
  amountA: string;
  amountB: string;
  addressUser: string;
  isActive?: boolean;
  isMarket?: boolean;
  isFilled?: boolean;
}

export interface GetOrdersInterface {
  tokenA?: string;
  tokenB?: string;
  addressUser?: string;
  active?: boolean;
}

export interface GetMatchingOrdersInterface {
  tokenA: string;
  tokenB: string;
  amountA: string;
  amountB: string;
}

export interface CancelOrderInterface {
  orderId: string;
}

export interface UpdateOrderStatusInterface {
  orderId: string;
  status: {
    isActive?: boolean;
    isMarket?: boolean;
    isFilled?: boolean;
  };
}
