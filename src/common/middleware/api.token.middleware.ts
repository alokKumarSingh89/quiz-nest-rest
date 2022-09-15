import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { APITokenPaymentException } from '../exception/api.token.payment.exception';

export class APITokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['api-token'] !== 'my-token') {
      //register the other app with token
      throw new APITokenPaymentException();
    }
    next();
  }
}
