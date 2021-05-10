import { Injectable } from '@nestjs/common';

@Injectable()
export class ChargeService {
  getHello(): string {
    return 'Hello World!';
  }
}
