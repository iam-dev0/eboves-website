import { Banner } from '@models/banner.model';

export interface Banners {
  slider?: Banner[];
  featured?: Banner[];
  dealOfTheDay?: Banner[];
}
