import { Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheService } from './cache/cache.service';
import { SQS } from 'aws-sdk';

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
    await this.cacheService.del('date');
    const date = new Date();
    const timestamp = date.getTime();
    await this.cacheService.set('date', timestamp.toString());
    const value = await this.cacheService.get('date');
    await this.cacheService.disconnect();

    return value;
  }

  @Get('enqueue/:id')
  async enqueueMessage(@Param('id') id: string): Promise<string> {
    const sqs = new SQS({
      region: 'eu-central-1',
    });
    const queueUrl =
      'https://sqs.eu-central-1.amazonaws.com/571832093814/mawi-test';
    const params = {
      MessageBody: id,
      QueueUrl: queueUrl,
    } as SQS.SendMessageRequest;
    await sqs.sendMessage(params).promise();

    return 'OK';
  }

  @Get('dequeue')
  async dequeueMessage(): Promise<string> {
    const sqs = new SQS({
      region: 'eu-central-1',
    });
    const queueUrl =
      'https://sqs.eu-central-1.amazonaws.com/571832093814/mawi-test';
    const params = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 1,
    } as SQS.ReceiveMessageRequest;
    const result = await sqs.receiveMessage(params).promise();
    if (result.Messages.length === 0) {
      return 'No message available';
    }
    const message = result.Messages[0];
    const deleteParams = {
      QueueUrl: queueUrl,
      ReceiptHandle: message.ReceiptHandle,
    } as SQS.DeleteMessageRequest;
    await sqs.deleteMessage(deleteParams).promise();

    return message.Body;
  }
}
