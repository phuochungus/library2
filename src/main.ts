import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import { ExcludeFields } from './interceptors/exclude-fields.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.useGlobalInterceptors(new ExcludeFields());

  const config = new DocumentBuilder()
    .setTitle('Libb example')
    .setDescription('The Libb API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
