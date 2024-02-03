import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from './app.interface';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  getHello():  HealthCheck {
    return this.appService.getHealth();
  }
}
