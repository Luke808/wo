import {DataModel} from './data-model';

export interface MyTemplate {
  id?: string;
  pid?: string;
  componentName?: string;
  isFullScreen?: boolean;
  model: DataModel | DataModel[];
}
