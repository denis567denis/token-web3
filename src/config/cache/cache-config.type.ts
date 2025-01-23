export interface CacheConfig {
  cache: {
    store: any;
    host: string;
    port: string;
    ttl: number;
  };
}
