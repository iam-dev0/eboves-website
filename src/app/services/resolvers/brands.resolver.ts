import { Brand } from '@models/brand.model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { BrandsService } from '@services/brands.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BrandsResolver implements Resolve<Brand> {
  constructor(private service: BrandsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Brand | Observable<Brand> | Promise<Brand> {
    return this.service.getBrandInfo(route.paramMap.get('brandSlug')).pipe(
      catchError((error) => {
        // console.log('error caught in brand resolver');
        return of(null);
      })
    );
  }
}
