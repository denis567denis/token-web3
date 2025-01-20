import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: string;

  @Column()
  tokenA: string;

  @Column()
  tokenB: string;

  @Column()
  amountA: string;

  @Column()
  amountB: string;

  @Column()
  user: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isMarket: boolean;

  @Column({ default: false })
  isFilled: boolean;
}
