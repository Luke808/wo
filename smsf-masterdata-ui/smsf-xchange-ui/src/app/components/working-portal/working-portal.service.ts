import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {WorkingPortalDTO} from '../../services/rest';

@Injectable()
export class WorkingPortalService {
  workingPortalDTOSource$ = new ReplaySubject<WorkingPortalDTO>(1);
  isFullScreenSource$ = new ReplaySubject<boolean>(1);

  setWorkingPortalDTO(data: WorkingPortalDTO) {
    console.log('WorkingPortalDTO', data);
    this.workingPortalDTOSource$.next(data);
  }

  setFullScreen(value: boolean) {
    console.log('FullScreen', value);
    this.isFullScreenSource$.next(value);
  }

  constructor() {
  }
}
