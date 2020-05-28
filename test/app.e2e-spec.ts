import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { Connection } from 'typeorm';
import * as cookieParser from 'cookie-parser';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    await app.init();
  });

  afterAll(async () => {
    const db = app.get(Connection);
    await db.close();
  });

  it('/livecheck', () => {
    return request(app.getHttpServer())
      .get('/livecheck')
      .expect(200)
      .expect('alive!');
  });

  describe('/todo', () => {
    it('should create note', () => {
      return request(app.getHttpServer())
        .post('/todo')
        .send({
          text: 'some text more than 10 letters',
        })
        .expect(201)
        .expect(({ body }) => {
          expect(body.text).toEqual('some text more than 10 letters');
          expect(body.id).toBeDefined();
        });
    });

    it('should fail note length validation', () => {
      return request(app.getHttpServer())
        .post('/todo')
        .send({
          text: '< than 10',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.message[0]).toEqual(
            'text must be longer than or equal to 10 characters',
          );
        });
    });
  });
});
