import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtModule } from '@nestjs/jwt';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { Web3Module } from './web3/web3.module';
import { EventsModule } from './events/events.module';
import { AuthGuard } from './libs/guards/auth.guard';
import { configuration } from './config/config';
import { PostgresConfigService } from './config/postgres/postgres-config.service';
import { JwtConfigService } from './config/jwt/jwt.config.service';
import { CacheConfigService } from './config/cache/cache-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configuration,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: PostgresConfigService,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      global: true,
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useClass: CacheConfigService,
      isGlobal: true,
    }),
    OrdersModule,
    Web3Module,
    EventsModule,
    UsersModule,
  ],
  providers: [
    AuthGuard,
    JwtConfigService,
    CacheConfigService,
    PostgresConfigService,
  ],
})
export class AppModule {}
