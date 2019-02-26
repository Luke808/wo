import {Component, OnInit} from '@angular/core';
import {WorkingPortalDTO} from '../../../../services/rest';
import {WorkingPortalService} from '../../working-portal.service';
import {CommonService} from 'smsf-ui-layout';

@Component({
  selector: 'app-working-portal-opt-common-info',
  templateUrl: './common-info.component.html',
  styleUrls: ['./common-info.component.scss']
})
export class CommonInfoComponent implements OnInit {
  model: WorkingPortalDTO;
  isFullScreen: boolean;

  constructor(private workingPortalService: WorkingPortalService, public cs: CommonService) {
    this.workingPortalService.workingPortalDTOSource$.subscribe(value => {
      this.model = value;
    });
    this.workingPortalService.isFullScreenSource$.subscribe(value => {
      this.isFullScreen = value;
    });
  }

  ngOnInit() {
  }

}
