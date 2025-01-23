export interface PostgresConfig {
  postgres: {
    port: number;
    username: string;
    password: string;
    database: string;
  };
}
