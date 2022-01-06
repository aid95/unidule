import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleBoardService } from '../schedule-board.service';

describe('ScheduleBoardService', () => {
  let service: ScheduleBoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleBoardService],
    }).compile();

    service = module.get<ScheduleBoardService>(ScheduleBoardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
