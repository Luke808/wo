import {Directive, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WorkingPortalAdviceControllerService} from '../../../services/rest';

@Directive({
  selector: '[xChangeDataSource]'
})
export class DataSourceDirective implements OnInit {

  @Input() xChangeDataSource: string;
  @Input() xChangeDataSourceParam?: string;
  @Input() xChangeDataSourceResult?: any;
  @Output() xChangeDataSourceResultChange = new EventEmitter<any>();

  constructor(private service: WorkingPortalAdviceControllerService) {

  }

  ngOnInit(): void {
    this.request();
  }

  private request() {
    this.service.componentDataSourceUsingPOST(JSON.parse(this.xChangeDataSourceParam), this.xChangeDataSource)
      .subscribe(value => {
        this.xChangeDataSourceResultChange.emit(value);
      });
  }
}
