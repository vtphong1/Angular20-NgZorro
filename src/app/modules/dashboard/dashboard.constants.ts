import {ITableColumn} from '@shared/models/column-table';
import {EModeType, ESelectType} from '@shared/enums/select-type';
import {FILTER_API_MAP} from '@core/ui-config';

export const columns: ITableColumn[] = [
  {
    columnDef: 'name',
    header: 'Tên',
    nzLeft: true,
    nzWidth: '150px',
    isFilter: true,
  },
  {
    columnDef: 'age',
    header: 'Tuổi',
    isFilter: true,
    checked: false,
    filter: {
      type: ESelectType.select,
      placeHolder: 'Tuổi',
      options: [
        {
          value: 10,
          label: '10'
        },
        {
          value: 20,
          label: '20'
        }
      ],
      name: 'age',
    }
  },
  {
    columnDef: 'address',
    header: 'Địa chỉ',
    checked: true,
    isFilter: true,
    filter: {
      type: ESelectType.select,
      placeHolder: 'Test select load all',
      options: [],
      loadAll: FILTER_API_MAP['loadAllUser'],
      name: 'address',
      mode: EModeType.multiple,
    }
  },
  {
    columnDef: 'user',
    header: 'User',
    isFilter: true,
    filter: {
      type: ESelectType.select,
      placeHolder: 'Test select load page',
      options: [],
      loadDataStream: FILTER_API_MAP['searchUser'],
      name: 'user',
    }
  },
  {
    columnDef: 'manager',
    header: 'Quản lý',
    isFilter: true,
    filter: {
      type: ESelectType.select,
      placeHolder: 'Test select load page',
      options: [],
      loadDataStream: FILTER_API_MAP['searchUser'],
      name: 'user',
    }
  },
  {
    columnDef: 'date',
    header: 'Ngày',
    checked: true,
    nzWidth: '250px',
    isFilter: true,
    filter: {
      type: ESelectType.date_time_picker,
      placeHolder: 'Chon ngày',
      name: 'date',
      format: 'dd/MM/yyyy',
    }
  },
  {
    columnDef: 'action',
    header: 'Hành động',
    // nzRight: true,
    nzWidth: '200px',
    thClass: 'text-center',
    tdClass: 'text-center',
    actions: [
      {
        name: 'delete',
        icon: 'delete',
        label: 'Delete',
        role: [],
      },
      {
        name: 'edit',
        icon: 'edit',
        label: 'Edit',
        role: []
      }
    ]
  }
]
