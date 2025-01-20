import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtModule } from '@nestjs/jwt';
import * as redisStore from 'cache-manager-redis-store';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { Web3Module } from './web3/web3.module';
import { EventsModule } from './events/events.module';
import { AuthGuard } from './libs/guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CacheModule.register({
      store: redisStore,
      host: process.env.HOST,
      port: process.env.REDIS_PORT,
      ttl: parseInt(process.env.REDIS_TIME_SAVE_CAHCE),
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,
    }),
    OrdersModule,
    Web3Module,
    EventsModule,
    UsersModule,
  ],
  providers: [AuthGuard],
})
export class AppModule {}
