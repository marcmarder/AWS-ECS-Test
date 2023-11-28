import { Injectable } from '@nestjs/common';
import { RedisClientType, createClient } from 'redis';

@Injectable()
export class CacheService {
  client;

  async connect() {
    const client = createClient({
      url: 'redis://tobi-mawi-test-0001-001.zhnxyp.0001.euc1.cache.amazonaws.com:6379',
    });

    client.on('error', (err) => {
      throw new Error(err);
    });
    await client.connect();

    this.client = client;
  }

  async del(key: string) {
    await this.client.del(key);
  }
  async disconnect() {
    await this.client.disconnect();
  }
  async get(key: string) {
    return await this.client.get(key);
  }
  async set(key: string, value: string) {
    await this.client.set(key, value);
  }
}
