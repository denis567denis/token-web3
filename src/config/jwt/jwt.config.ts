import { JwtConfig } from './jwt.config.type';

export const jwtConfiguration = (): JwtConfig => {
  return {
    jwt: {
      secret: process.env.JWT_SECRET,
    },
  };
};
