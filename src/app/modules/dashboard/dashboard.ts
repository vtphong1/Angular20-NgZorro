import {Component, inject} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {columns} from './dashboard.constants';
import {NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import {SelectInfinite} from '@shared/components/select-infinite/select-infinite';
import {TableCommon} from '@shared/components/table-common/table-common';
import {IParamsSearch, UiConfigService} from '@shared/services/ui-config/ui-config-service';
import {ITableColumn} from '@shared/models/column-table';
import {IPagination} from '@core/bases/model';
import {ConfirmModal} from '@shared/components/confirm-modal/confirm-modal';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    FormsModule,
    SelectInfinite,
    ReactiveFormsModule,
    TableCommon,
    NzDatePickerModule,
    NzModalModule,
    NzIconModule,
    TranslatePipe
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  apiService = inject(UiConfigService);
  modalService = inject(NzModalService);
  user = new FormControl([15, 20], Validators.required);

  columns: ITableColumn[] = columns;
  data = [
    {
      name: 'Nguyễn Văn A',
      age: 27,
      address: 'Nam Định',
      manager: 'admin',
      date: new Date(),
      checked: false,
    },
    {
      name: 'Nguyễn Văn B',
      age: 26,
      address: 'Hà Nội',
      manager: 'admin',
      date: new Date(),
      checked: true,
    },
    {
      name: 'Nguyễn Văn C',
      age: 24,
      manager: 'admin',
      address: 'Thái Bình',
      date: new Date(),
      checked: false
    }
  ]

  pagination: IPagination = {
    pageIndex: 1,
    page: 0,
    total: 3,
    size: 10
  }

  loadUserStream = (params: IParamsSearch) => {
    return this.apiService.searchUser(params);
  }

  getUserById = (id: any) => {
    return this.apiService.searchUserById(id);
  }

  actionEvent(e: any) {
    if (e.action === 'delete') {
      this.modalService.create({
        nzTitle: 'Xác nhận xoá',
        nzData: {
          content: 'Có muốn xoá không'
        },
        nzContent: ConfirmModal,
        nzWidth: '70vw',
        nzFooter: null,
        nzClosable: true,
        nzMaskClosable: false,
      })
    }
  }
}
