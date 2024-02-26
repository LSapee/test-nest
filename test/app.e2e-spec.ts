import { Test, TestingModule } from '@nestjs/testing';
import {INestApplication, NotFoundException, ValidationPipe} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
//test용 Movie생성
  const testMovie = {
    title:"potato",
    genres:["aa","bb"],
    year:2000
  }
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true,
      transform:true
    }));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my app');
  });

  it('GET',()=>{
    return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([]);
  })
  it('POST',()=>{
    return request(app.getHttpServer())
        .post('/movies')
        .send(testMovie)
        .expect(201);
  })
  it('POST 400',()=>{
    return request(app.getHttpServer())
        .post('/movies')
        .send({testMovie,"sdsd":"aaa"})
        .expect(400);
  })
  it('DELETE',()=>{
    return request(app.getHttpServer())
        .delete('/movie/1')
        .expect(404)
  })

  describe("/movies/:id",()=>{
    it("GET 200",()=>{
      return request(app.getHttpServer()).get("/movies/1").expect(200);
    })

    it("PATCH",()=>{
      return request(app.getHttpServer()).patch("/movies/1").send({title:"apa22"}).expect(200);
    })

    it("DELETE",()=>{
      return request(app.getHttpServer()).delete("/movies/1").expect(200);
    })
  })
});
