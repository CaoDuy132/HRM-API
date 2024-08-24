import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import './common/custom/repository-typeorm.custom';
import './common/custom/select-typeorm.custom';
import { GlobalExceptionFilter } from './common/exception-filters';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());

  const configService = app.select(SharedModule).get(ApiConfigService);
  const config = new DocumentBuilder()
    .setTitle('HRM API')
    .setDescription('The HRM API description')
    .addBearerAuth()
    .setVersion('1.0')
    .addServer(configService.appConfig.API_PREFIX)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.setGlobalPrefix(configService.appConfig.API_PREFIX);
  app.enableCors({
    origin: '*',
    credentials: true,
    exposedHeaders: ['Content-Disposition'],
  });
  await app.listen(configService.appConfig.PORT);
  console.log(`Application is running on port ${configService.appConfig.PORT}`);
}
bootstrap();
