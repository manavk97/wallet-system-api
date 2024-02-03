import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LoggerModule as PinoLoggerModule } from "nestjs-pino";

@Module({
    imports: [
      PinoLoggerModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async () => {
          return {
            pinoHttp: {
              transport: {
                target: "pino-pretty",
                options: {
                  singleLine: true,
                  translateTime: "yyyy-mm-dd HH:MM:ss.l o",
                },
              },
            },
          };
        },
      }),
    ],
  })
export class LoggerModule {}
