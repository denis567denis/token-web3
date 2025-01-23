import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { Config } from '../connfig.types';
import { User } from 'src/users/infrastructure/entities/user.entity';
import { OrderEntity } from 'src/orders/infrastructure/entities/order.entity';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService<Config>) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const { port, username, password, database } =
      this.configService.get('postgres');
    return {
      type: 'postgres',
      host: process.env.HOST,
      port,
      username,
      password,
      database,
      entities: [User, OrderEntity],
      synchronize: true,
    };
  }
}
