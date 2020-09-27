import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private title: Title, private meta: Meta) {}

  setTitle(title: string) {
    this.title.setTitle(
      title || 'Online Shopping for Fashion, Appliances & More! - Eboves'
    );
  }

  setMetaTags(tags?: Map<string, string>) {
    if (!tags) {
      this.meta.addTag({ name: 'keywords', content: '' });
      this.meta.addTag({
        name: 'description',
        content:
          'Eboves - Shop Online for All Kinds of Products & Enjoy Great Prices And Offers | Secure Payments - Fast Delivery - Free Returns',
      });
      return;
    }
    const tagObjects = [];
    tags.forEach((value: string, key: string) => {
      if (key === 'description') {
        tagObjects.push({
          name: key,
          content:
            value ||
            'Eboves - Shop Online for All Kinds of Products & Enjoy Great Prices And Offers | Secure Payments - Fast Delivery - Free Returns',
        });
      } else {
        tagObjects.push({ name: key, content: value });
      }
    });
    this.meta.addTags(tagObjects);
  }
}
