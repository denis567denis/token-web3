import { jwtConfiguration } from './jwt/jwt.config';
import { postgresConfiguration } from './postgres/postgres.config';
import { cacheConfig } from './cache/cache-config.config';

export const configuration = [
  postgresConfiguration,
  cacheConfig,
  jwtConfiguration,
];
