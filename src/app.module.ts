import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { WalletModule } from './api/wallet/wallet.module';
import { TransactionModule } from './api/transaction/transaction.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { FormatterInterceptor } from './shared/formatter/formatter.interceptor';

@Module({
  imports: [SharedModule, WalletModule, TransactionModule],
  controllers: [AppController],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: FormatterInterceptor,
  },AppService],
})
export class AppModule {}
