import { Request } from "express";

export interface HealthCheck {
  status: string;
  uptime: string;
}
