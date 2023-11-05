import { Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('beer')
  getBier(@Req() request: Request): string {
    return JSON.stringify(this.appService.getBier());
  }

  @Get('beer/:id')
  getSpecific(@Param('id') id: string): string {
    return JSON.stringify(this.appService.getSpecific(id));
  }
}
