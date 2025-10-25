import {Observable} from 'rxjs';
import {IParamsSearch, IResponseOption, UiConfigService} from '@shared/services/ui-config/ui-config-service';

let uiConfigService: UiConfigService;

export function initFilterApiMap(service: UiConfigService) {
  uiConfigService = service;
}

export const FILTER_API_MAP = {
  loadAllUser: (params?: IParamsSearch): Observable<IResponseOption<any[]>> => uiConfigService.loadAllUser(params),
  searchUser: (params: IParamsSearch): Observable<IResponseOption<any[]>> => uiConfigService.searchUser(params),
  getUserById: (id: any): Observable<IResponseOption<any>> => uiConfigService.searchUserById(id)
};
