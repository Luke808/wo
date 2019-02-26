export * from './employeeController.service';
import { EmployeeControllerService } from './employeeController.service';
export * from './ncTypeController.service';
import { NcTypeControllerService } from './ncTypeController.service';
export * from './noncomplianceController.service';
import { NoncomplianceControllerService } from './noncomplianceController.service';
export const APIS = [EmployeeControllerService, NcTypeControllerService, NoncomplianceControllerService];
