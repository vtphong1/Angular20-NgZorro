import {APP_INITIALIZER, Provider} from '@angular/core';
import {Store} from '@ngrx/store';
import {initFilterApiMap} from '../ui-config';
import {registerCustomIcons} from '@core/providers/register-icon';
import {UiConfigService} from '@shared/services/ui-config/ui-config-service';
import {loadRole} from '@app/states/role/role.actions';

// export function preloadStorage(storage: StorageService) {
//   return () => storage.getItem('authenticated');
// }

export const appInitProvider = {
  provide: APP_INITIALIZER,
  useFactory: (store: Store) => () => {
    store.dispatch(loadRole());
  },
  deps: [Store],
  multi: true
};

// export const getLocalStorage = {
//   provide: APP_INITIALIZER,
//   useFactory: preloadStorage,
//   deps: [StorageService],
//   multi: true
// }


export const FilterApiInitializer: Provider = {
  provide: APP_INITIALIZER,
  useFactory: (service: UiConfigService) => () => initFilterApiMap(service),
  deps: [UiConfigService],
  multi: true
};

export const registerIcon = {
  provide: APP_INITIALIZER,
  useFactory: () => registerCustomIcons,
  multi: true
}

