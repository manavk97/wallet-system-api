import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return {
                    uri: `mongodb+srv://${configService.get<string>(
                        "DB_USERNAME"
                    )}:${configService.get<string>(
                        "DB_PASSWORD"
                    )}@${configService.get<string>("DB_HOST")}/${configService.get<string>(
                        "DB_NAME"
                    )}?retryWrites=true&w=majority`,
                }
            },
            inject: [ConfigService],
        }),
    ],
})
export class MongoModule { }
