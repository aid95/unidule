import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as request from 'supertest';

describe('강의 정보 (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
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
    it.todo('실패');
  });

  describe('검색', () => {
    it.todo('성공');
    it.todo('실패');
  });

  describe('수정', () => {
    it.todo('성공');
    it.todo('실패');
  });

  describe('삭제', () => {
    it.todo('성공');
    it.todo('실패');
  });
});
