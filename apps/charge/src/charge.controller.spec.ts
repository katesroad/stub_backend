import { Test, TestingModule } from '@nestjs/testing';
import { ChargeController } from './charge.controller';
import { ChargeService } from './charge.service';

describe('ChargeController', () => {
  let chargeController: ChargeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChargeController],
      providers: [ChargeService],
    }).compile();

    chargeController = app.get<ChargeController>(ChargeController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(chargeController.getHello()).toBe('Hello World!');
    });
  });
});
