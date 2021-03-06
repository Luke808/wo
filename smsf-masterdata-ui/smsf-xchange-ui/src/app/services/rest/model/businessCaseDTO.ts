/**
 * Automation API provider
 * Automation provides template of this description, and anyone may modify it in your own project.
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { SearchOrderBy } from './searchOrderBy';


export interface BusinessCaseDTO { 
    businessStatus?: string;
    businessStatusName?: string;
    clientServiceLevelId?: string;
    clientServiceLevelLayeredName?: string;
    clientServiceLevelName?: string;
    comments?: string;
    completeTime?: Date;
    createTime?: Date;
    dataStatus?: string;
    deadline?: Date;
    exceptionMessage?: string;
    gteCompleteTime?: Date;
    gteDeadline?: Date;
    gteReceiveTime?: Date;
    hasAuth?: boolean;
    id?: string;
    inflowVolume?: number;
    isCompleted?: boolean;
    isException?: boolean;
    isNc?: boolean;
    isPendding?: boolean;
    isRejected?: boolean;
    isTerminated?: boolean;
    lteCompleteTime?: Date;
    lteDeadline?: Date;
    lteReceiveTime?: Date;
    operateTime?: Date;
    operatorId?: string;
    operatorName?: string;
    preOperatorId?: string;
    priority?: number;
    priorityName?: string;
    processId?: string;
    processName?: string;
    referenceNo?: string;
    rejectReason?: string;
    searchAuthType?: BusinessCaseDTO.SearchAuthTypeEnum;
    searchOrderBys?: Array<SearchOrderBy>;
    slaHour?: string;
    slaMinute?: string;
    stepId?: string;
    stepName?: string;
    stepType?: string;
    terminateTime?: Date;
    transactionId?: string;
    version?: number;
    viewEmployee?: string;
    viewGroup?: string;
    viewRole?: string;
    wasNc?: boolean;
}
export namespace BusinessCaseDTO {
    export type SearchAuthTypeEnum = 'ALL' | 'MYTASK' | 'UNDEAL';
    export const SearchAuthTypeEnum = {
        ALL: 'ALL' as SearchAuthTypeEnum,
        MYTASK: 'MYTASK' as SearchAuthTypeEnum,
        UNDEAL: 'UNDEAL' as SearchAuthTypeEnum
    };
}
