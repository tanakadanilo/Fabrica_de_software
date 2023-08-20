import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class BaseResolver implements Resolve<number> {
  resolve(route: ActivatedRouteSnapshot): number {
    let idString: any = route.paramMap.get('id');
    if (idString == null) {
      idString = '0';
    }
    const id = parseInt(idString);
    return id;
  }
}
