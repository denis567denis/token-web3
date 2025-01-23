import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

import { Config } from '../connfig.types';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService<Config>) {}

  public createJwtOptions(): JwtModuleOptions {
    const { secret } = this.configService.get('jwt');
    return { secret };
  }
}
