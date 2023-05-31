import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { createOpenAPIObject } from './../src/openApiBuilder';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';
import { OpenAPIObject } from '@nestjs/swagger';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  function removeServers(document: OpenAPIObject): OpenAPIObject {
    document.servers = [];
    return document;
  }

  async function getCurrentSpecification() : Promise<OpenAPIObject> {
    const document = await createOpenAPIObject(app);
    return removeServers(document);
  }

  function getSavedSpecification(): OpenAPIObject {
    const content = readFileSync('open-api.yaml', 'utf8');
    const document = load(content) as OpenAPIObject;
    return removeServers(document);
  }

  it('is compatible with OpenApi documentation', async () =>{
    const currentSpecification = await getCurrentSpecification();
    const savedSpecification = getSavedSpecification();

    expect(currentSpecification).toEqual(savedSpecification);
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(404);
  });

  it('/cats (GET)', () => {
    return request(app.getHttpServer()).get('/cats').expect(200);
  });

  it('/cats/1 (GET)', () => {
    return request(app.getHttpServer()).get('/cats/1').expect(404);
  });
});
