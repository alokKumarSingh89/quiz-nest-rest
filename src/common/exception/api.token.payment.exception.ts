import { HttpException, HttpStatus } from '@nestjs/common';

export class APITokenPaymentException extends HttpException {
  constructor() {
    super('API Token Request to procees the request', HttpStatus.FORBIDDEN);
  }
}
