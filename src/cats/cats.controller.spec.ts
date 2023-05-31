import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let appController: CatsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    appController = app.get<CatsController>(CatsController);
  });

  describe('findOne', () => {
    it('should throw exception when called with 1', () => {
      expect(() => appController.findOne("Bob")).toThrowError("Not such cat");
    });
  });
});
