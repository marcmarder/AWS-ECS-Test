import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getBier() {
    console.log('Getting all beers');
    return {
      beers: [
        {
          name: 'Herrenhaeuser',
          pictureURL: 'https://www....jpg',
        },
        {
          name: 'Jever',
          pictureURL: 'https://www....jpg',
        },
      ],
    };
  }

  getSpecific(key: string) {
    console.log('Getting specific beer: ' + key);
    const bier = this.getBier();
    const beer = bier.beers.find((value) => value.name === key);
    if (beer) {
      return beer;
    } else {
      return 404;
    }
  }
}
