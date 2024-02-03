import { ValidationPipe, VersioningType } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { Logger, LoggerErrorInterceptor, PinoLogger } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    rawBody: true,
  });

  app.useLogger(app.get(Logger));

  const logger = new PinoLogger({});
  logger.setContext("main.ts");

  const configService = app.get<ConfigService>(ConfigService);
  app.setGlobalPrefix("api");

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  app.enableCors({});

  app.use(helmet());

  app.useBodyParser("json", { limit: "1mb" });

  const options = new DocumentBuilder()
    .setTitle('Wallet System API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);


  await app.listen(configService.get("PORT") || 3000);

  logger.info(
    `Application started on port: ${configService.get("PORT") || 3000
    }`
  );
  logger.info("Application started successfully");
}
bootstrap();
