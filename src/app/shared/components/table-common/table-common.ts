import {Component, EventEmitter, Input, Output, SimpleChanges, TemplateRef} from '@angular/core';
import {ITableColumn, ITableSetting} from '../../models/column-table';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NzTableModule} from 'ng-zorro-antd/table';
import {SelectInfinite} from '../select-infinite/select-infinite';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {IPagination} from '@core/bases/model';

@Component({
  selector: 'app-table-common',
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    SelectInfinite,
    NzDropDownModule,
    NzCheckboxModule,
    NzIconModule,
    NzDatePickerModule,
    NzInputModule,
    NzButtonModule,
    NzTooltipDirective,
    NzPaginationModule
  ],
  templateUrl: './table-common.html',
  styleUrl: './table-common.scss'
})
export class TableCommon {
  @Input() isSettingColumn: boolean = true;
  @Input() columns: ITableColumn[] = [];
  @Input() listOfData: any[] = [];
  @Input() pagination: IPagination = {
    pageIndex: 1,
    page: 0,
    size: 10,
    total: 0
  }
  @Output() actionEvent = new EventEmitter();
  @Output() filterEvent = new EventEmitter();
  @Input() nzScroll: {x?: string, y?: string} = {x: '1000px'};
  @Input() settingTable: ITableSetting = {
    nzShowPagination: true,
    checkboxColumn: true
  };
  displayColumns: ITableColumn[] = [];
  allCheckedRow: boolean = false;
  allCheckedColumn = false;

  @Input() cellTemplate : {[columnDef: string]: TemplateRef<any> | null} = {};
  @Input() headerTemplate : {[columnDef: string]: TemplateRef<any> | null} = {};

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['columns'].currentValue) {
      this.columns = this.columns
        ?.map(col => ({
          ...col,
          checked: col?.checked !== false ? true : col.checked,
          filterValue: col?.valueFilter ? col?.valueFilter : null
        }))
      this.displayColumns = this.handleDisplayColumns(this.columns);
      this.updateCheckAllState();
    }
  }

  private handleDisplayColumns(columns: ITableColumn[]) {
    return columns?.filter(col => col?.checked !== false);
  }

  ngOnInit(): void {
  }

  onAllCheckedRow(checked: boolean): void {
    this.listOfData = [
      ...this.listOfData?.map((item: any) => ({...item, checked: checked})),
    ]
  }
  changeCheckedRow(e: any): void {
    if (!e) {
      this.allCheckedRow = false;
    } else {
      this.allCheckedRow = this.listOfData.every((item: any) => item.checked);
    }
  }

  onCheckAllChange(checked: boolean): void {
    this.columns?.forEach((item: any) => item.checked = checked);
    this.displayColumns = [...this.columns];
  }

  // Cập nhật lại trạng thái "Chọn tất cả" nếu người dùng chọn thủ công
  updateCheckAllState(): void {
    this.allCheckedColumn = this.columns.every((item: any) => item?.checked);
    this.displayColumns = this.handleDisplayColumns(this.columns);
  }

  filterDataByColumn(col: any, e: any) {
    const temp = this.displayColumns.filter(item => item.valueFilter);
    let obj: any = {};
    temp.forEach(item => {
      const key = item?.filter?.name ?? item.columnDef;
      const value = item?.valueFilter;
      obj[key] = value;
    })
    this.filterEvent.emit(obj);
  }

  onButtonClick(actionName: string, item: any) {
    const obj = {
      action: actionName,
      item: item
    }
    this.actionEvent.emit(obj);
  }
}
