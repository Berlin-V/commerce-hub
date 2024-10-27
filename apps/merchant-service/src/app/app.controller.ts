import { Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('/merchant')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/create')
  createMerchant(payload) {
    return this.appService.getData();
  }
}
