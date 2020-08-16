import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private title: Title, private meta: Meta) {}

  setTitle(title: string) {
    this.title.setTitle(title);
  }

  setMetaTags(tags: Map<string, string>) {
    const tagObjects = [];
    tags.forEach((value: string, key: string) => {
      tagObjects.push({ name: key, content: value });
    });
    this.meta.addTags(tagObjects);
  }
}
