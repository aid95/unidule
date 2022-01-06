import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as request from 'supertest';

describe('강의 정보 (e2e)', () => {
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
    it('성공', () => {
      return request(app.getHttpServer())
        .post('/courses')
        .set('Content-Type', 'application/json; charset=utf-8')
        .send({
          courseId: '1234-12',
          title: 'C programming',
          weekday: 'WED',
          start: '2019-11-13T00:47:06.943Z',
          end: '2019-11-13T00:47:06.943Z',
        })
        .expect(201);
    });
  });

  describe('검색', () => {
    it('성공', () => {
      return request(app.getHttpServer())
        .get('/courses')
        .set('Content-Type', 'application/json; charset=utf-8')
        .send({
          offset: 0,
          limit: 10,
        })
        .expect(200)
        .expect((res) => expect(res.body).toHaveProperty('courses'));
    });
  });

  describe('수정', () => {
    it('성공', () => {
      return request(app.getHttpServer())
        .put('/courses')
        .set('Content-Type', 'application/json; charset=utf-8')
        .send({
          id: 1,
          title: 'Database',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(1);
          expect(res.body.title).toBe('Database');
        });
    });
  });

  describe('삭제', () => {
    it('성공', () => {
      return request(app.getHttpServer())
        .delete('/courses/1')
        .set('Content-Type', 'application/json; charset=utf-8')
        .send({
          offset: 0,
          limit: 10,
        })
        .expect(200);
    });
  });
});
