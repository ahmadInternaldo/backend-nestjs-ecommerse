import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { ResponseInterface } from './utils/response.interface';

@ApiTags('Uptime Server')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async uptimeServer(): Promise<ResponseInterface> {
    return this.appService.uptimeServer();
  }
}
