import {Injectable} from '@angular/core';

/**
 * 所有菜单数据
 */
export const layoutMenu = [
  {label: 'Component', icon: 'fa-clipboard-list', routerLink: ['/component'], permissionCode: 'xchange.component.view'},
  {label: 'Directive', icon: 'fa-th', routerLink: ['/directive'], permissionCode: 'xchange.directive.view'},
  {
    label: 'FormatValidationRule',
    icon: 'fa-user',
    routerLink: ['/format-validation-rule'],
    permissionCode: 'xchange.validation.rule.view'
  },
  {
    label: 'BusinessObject',
    icon: 'fa-users',
    routerLink: ['/business-object'],
    permissionCode: 'xchange.template.view'
  },
  {label: 'Template', icon: 'fa-user-secret', routerLink: ['/template'], permissionCode: 'xchange.template.view'},
  {
    label: 'Working List',
    icon: 'fa-user-secret',
    routerLink: ['/working-list'],
    permissionCode: 'xchange.template.view'
  }
];

/**
 * 公共数据
 */
@Injectable()
export class Constants {
}
