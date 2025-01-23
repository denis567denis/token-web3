import { CacheConfig } from './cache-config.type';
import * as redisStore from 'cache-manager-redis-store';

export const cacheConfig = (): CacheConfig => {
  return {
    cache: {
      store: redisStore,
      host: process.env.HOST,
      port: process.env.REDIS_PORT,
      ttl: parseInt(process.env.REDIS_TIME_SAVE_CAHCE),
    },
  };
};
