import {IOptionModel} from './option-model';
import {Observable} from 'rxjs';
import {IParamsSearch, IResponseOption} from '../services/ui-config/ui-config-service';
import {ESelectType, ModeSelectType} from '../enums/select-type';

export interface ITableColumn {
  columnDef: string,
  header: string,
  checked?: any,
  nzLeft?: boolean,
  nzRight?: boolean,
  nzWidth?: string,
  isFilter?: true,
  filter?: IFilterColumn,
  thClass?: string,
  tdClass?: string,
  valueFilter?: any,
  actions?: IActionTable[],
}

interface IFilterColumn {
  type: ESelectType,
  placeHolder?: string,
  options?: IOptionModel[],
  name?: string,
  loadAll?: (params?: IParamsSearch) => Observable<IResponseOption<any[]>>,
  loadDataStream?: (params: IParamsSearch) => Observable<IResponseOption<any[]>>,
  loadDetail?: (id: any) => Observable<IResponseOption<any>>,
  mode?: ModeSelectType,
  nzMaxTag?: number,
  emitObject?: boolean,
  format?: string
}

interface IActionTable {
  name: string,
  label: string
  icon: string,
  htmlIcon?: string,
  role?: string[],
}

export interface ITableSetting {
  nzShowPagination: boolean,
  checkboxColumn: boolean,
  [key: string]: any
}
