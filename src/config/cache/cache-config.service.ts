import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';

import { Config } from '../connfig.types';

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  constructor(private readonly configService: ConfigService<Config>) {}
  createCacheOptions(): CacheModuleOptions {
    const { store, host, port, ttl } = this.configService.get('cache');
    return {
      store,
      host,
      port,
      ttl,
    };
  }
}
