import { PostgresConfig } from './postgres.type';

export const postgresConfiguration = (): PostgresConfig => {
  return {
    postgres: {
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
    },
  };
};
