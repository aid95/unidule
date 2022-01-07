import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as request from 'supertest';

describe('시간표 (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(() => {
    app.close();
  });

  describe('등록', () => {
    it('성공', async () => {
      const res = await request(app.getHttpServer())
        .post('/schedules')
        .set('Content-Type', 'application/json; charset=utf-8')
        .send({ title: '2022 schedule board' });
      expect(res.statusCode).toBe(201);
    });
  });

  describe('검색', () => {
    it('성공', async () => {
      const res = await request(app.getHttpServer()).get('/schedules/1').send();
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('2022 schedule board');
    });
  });

  describe('수정', () => {
    it('성공', async () => {
      const newTitle = '2022 Happy schedule';
      const res = await request(app.getHttpServer())
        .put('/schedules')
        .send({ id: 1, title: newTitle });
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe(newTitle);
    });
  });

  describe('삭제', () => {
    it('성공', async () => {
      const res = await request(app.getHttpServer())
        .delete('/schedules/1')
        .send();
      expect(res.statusCode).toBe(200);
    });
  });
});
