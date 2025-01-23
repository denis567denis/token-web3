import { JwtConfig } from './jwt/jwt.config.type';
import { PostgresConfig } from './postgres/postgres.type';
import { CacheConfig } from './cache/cache-config.type';

export interface Config extends PostgresConfig, CacheConfig, JwtConfig {}
