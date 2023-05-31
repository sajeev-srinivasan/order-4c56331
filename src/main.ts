import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { createOpenAPIObject } from './openApiBuilder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const document = await createOpenAPIObject(app);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  const url = await app.getUrl();
  console.log(`Application is running on: ${url}/api`);
}
bootstrap();
