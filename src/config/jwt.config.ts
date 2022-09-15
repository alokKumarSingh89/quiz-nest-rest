import { JwtModuleAsyncOptions } from '@nestjs/jwt';

import config from './app.config';

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: config().secret,
      signOptions: { expiresIn: '1d' },
    };
  },
};
