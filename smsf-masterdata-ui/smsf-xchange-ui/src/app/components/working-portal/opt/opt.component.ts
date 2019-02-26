import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {MyTemplate} from '../core/my-template';
import {COMPONENTS} from '../template/constant';
import {WorkingPortalService} from '../working-portal.service';
import {DataModel} from '../core/data-model';
import {CommonService} from 'smsf-ui-layout';
import {WorkingPortalDTO, WorkingPortalNode} from '../../../services/rest';
import {AnchorDirective} from '../custom/anchor.directive';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-working-portal-opt',
  templateUrl: './opt.component.html',
  styleUrls: ['./opt.component.scss']
})
export class OptComponent implements OnInit {
  @ViewChild(AnchorDirective) anchor: AnchorDirective;
  viewChildren: MyTemplate[];
  isFullScreen: boolean;
  workingPortalDTO: WorkingPortalDTO;
  @ViewChild('optForm') optForm: NgForm;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private workingPortalService: WorkingPortalService,
              public cs: CommonService) {

  }

  ngOnInit() {
    this.viewChildren = [];
    this.workingPortalService.workingPortalDTOSource$.subscribe(value => {
      this.anchor.viewContainerRef.clear();
      this.workingPortalDTO = value;
      this.recursiveComponentTrees(this.workingPortalDTO.nodes);
    });
    this.workingPortalService.isFullScreenSource$.subscribe(value => {
      this.isFullScreen = value;
      this.switchFullScreen(value);
    });
  }


  switchFullScreen(value) {
    if (!this.viewChildren) {
      return;
    }
    this.viewChildren.forEach(view => {
      view.isFullScreen = value;
    });
  }

  getBusinessDataList(): DataModel[] {
    let result: DataModel[] = [];

    this.viewChildren.forEach(value => {
      if (value.model instanceof DataModel) {
        result.push(value.model);
      } else {
        result = result.concat(value.model);
      }
    });
    return result;

  }


  recursiveComponentTrees(nodes: WorkingPortalNode[]) {
    if (!nodes) {
      return;
    }
    nodes.forEach(node => {
      this.loadComponent(node);
      if (node.subNodes) {
        this.recursiveComponentTrees(node.subNodes);
      }
    });
  }


  loadComponent(currentNode: WorkingPortalNode) {
    const viewContainerRef = this.anchor.viewContainerRef;
    const template = currentNode.template;
    const model = currentNode.businessData;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(COMPONENTS[template.componentName]);
    if (template.layout === 'FORM') {
      const componentRef = viewContainerRef.createComponent(componentFactory);
      const instance = <MyTemplate>componentRef.instance;
      instance.id = currentNode.id;
      instance.pid = currentNode.pid;
      instance.model = model;
      instance.componentName = template.componentName;
      this.viewChildren.push(instance);
      instance.isFullScreen = this.isFullScreen;

    } else if (template.layout === 'TABLE') {
      let instance = this.viewChildren.find(value => {
        return value.componentName === template.componentName && value.pid === currentNode.pid;
      });
      if (instance) {
        (<DataModel[]>instance.model).push(model);
      } else {
        const componentRef = viewContainerRef.createComponent(componentFactory);
        instance = <MyTemplate>componentRef.instance;
        instance.id = currentNode.id;
        instance.pid = currentNode.pid;
        instance.componentName = template.componentName;
        instance.model = [model];
        this.viewChildren.push(instance);
        instance.isFullScreen = this.isFullScreen;
      }
    }

  }
}
