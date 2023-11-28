import { Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheService } from './cache/cache.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly cacheService: CacheService,
  ) {}

  @Get('beer')
  getBier(@Req() request: Request): string {
    return JSON.stringify(this.appService.getBier());
  }

  @Get('beer/:id')
  getSpecific(@Param('id') id: string): string {
    return JSON.stringify(this.appService.getSpecific(id));
  }

  @Get('testcache')
  async getTest(): Promise<string> {
    await this.cacheService.connect();
    await this.cacheService.del("date");
    const date = new Date();
    const timestamp = date.getTime();
    await this.cacheService.set('date', timestamp.toString());
    const value = await this.cacheService.get('date');
    await this.cacheService.disconnect();

    return value;
  }
}
