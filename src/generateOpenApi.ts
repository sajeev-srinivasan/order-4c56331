import { NestFactory } from '@nestjs/core';
import { writeFileSync } from 'fs';
import { AppModule } from './app.module';
import { createOpenAPIObject } from './openApiBuilder';
import { dump } from 'js-yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = await createOpenAPIObject(app);
  document.servers = [ { url: "https://api-order-demobackstage1.empcbr.thoughtworks-labs.net" } ];
  const content = dump(document);
  writeFileSync('open-api.yaml', content, { encoding: 'utf8'});
  await app.close();
}
bootstrap();
