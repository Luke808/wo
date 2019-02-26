import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class TemplateService {

  elementDirective$ = new Subject<any[]>();


  selectElementDirective(selected: any[]) {
    this.elementDirective$.next(selected);
  }

}
