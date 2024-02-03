import { Injectable } from '@nestjs/common';
import { HealthCheck } from './app.interface';

@Injectable()
export class AppService {
  getHealth() : HealthCheck{ 
    return {
      status: "ok",
      uptime: process.uptime() + " seconds",
    };
  }
}
