import { Brand } from '@models/brand.model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { CategoriesService } from '@services/categories.service';
import { Category } from '@models/category.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoriesResolver implements Resolve<Category> {
  constructor(private service: CategoriesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Category | Observable<Category> | Promise<Category> {
    let slug: string = '';

    if (route.paramMap.get('subCatSlug')) {
      slug = route.paramMap.get('subCatSlug');
    } else {
      slug = route.paramMap.get('catSlug');
    }

    return this.service.getCategoryInfo(slug).pipe(
      catchError((error) => {
        return of(null);
      })
    );
  }
}
