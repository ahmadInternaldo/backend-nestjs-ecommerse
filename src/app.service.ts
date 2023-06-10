import { Injectable } from '@nestjs/common';
import { ResponseInterface } from './utils/response.interface';
import { Transform } from './utils/transform';

@Injectable()
export class AppService {
  async uptimeServer(): Promise<ResponseInterface> {
    return new Transform('server up', 'success', '').transform();
  }
}
