import { Controller, Get } from '@nestjs/common';
import { ChargeService } from './charge.service';

@Controller()
export class ChargeController {
  constructor(private readonly chargeService: ChargeService) {}

  @Get()
  getHello(): string {
    return this.chargeService.getHello();
  }
}
