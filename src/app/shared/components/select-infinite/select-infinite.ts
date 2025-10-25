import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {IParamsSearch, IResponseOption} from '../../services/ui-config/ui-config-service';
import {debounceTime, distinctUntilChanged, finalize, Observable, of, Subject, Subscription, switchMap} from 'rxjs';
import {IOptionModel} from '../../models/option-model';
import {CommonModule} from '@angular/common';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {EModeType, ModeSelectType} from '../../enums/select-type';

@Component({
  selector: 'app-select-infinite',
  imports: [CommonModule, NzSelectModule, FormsModule, ScrollingModule],
  templateUrl: './select-infinite.html',
  styleUrl: './select-infinite.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInfinite),
      multi: true,
    },
  ],

})
export class SelectInfinite {

  @Input() placeholder = '';
  @Input() apiFnAll?: (params?: IParamsSearch) => Observable<IResponseOption<any[]>>;
  @Input() apiFnStream?: (params: IParamsSearch) => Observable<IResponseOption<any[]>>;
  @Input() apiByIdFn?: (ids: any) => Observable<any>;
  @Input() mode: ModeSelectType = 'default'
  @Input() nzMaxTagCount = 3;
  @Input() emitObject = false;
  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();
  @Output() openChange = new EventEmitter<void>();
  private searchSubject = new Subject<string>();
  private currentKeyword = '';
  isOpenChange: boolean = false;

  /** Cho phép truyền list fix sẵn từ ngoài vào */
  @Input() list: IOptionModel[] = [];

  loading = false;
  value: any = null;

  private page = 0;
  private readonly size = 10;
  private listMap = new Map<any, IOptionModel>();

  onChange = (_: any) => {};
  onTouched = () => {};

  // --- Lifecycle ---
  ngOnInit() {
    this.value = this.mode === 'multiple' ? [] : null;

    // Nếu có list từ ngoài => lưu vào listMap luôn
    if (this.list?.length) {
      this.mergeDataToList(this.list);
    }

    if (this.apiFnStream) {
      this.searchSubject.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(keyword => {
          const params: IParamsSearch = { page: 0, size: this.size, keyword };
          return this.apiFnStream ? this.apiFnStream(params) : of({data: []});
        }),
        finalize(() => this.loading = false)
      ).subscribe((res: any) => {
        this.listMap.clear();
        this.mergeDataToList(res?.data || []);
      });
    }
  }

  onSearch(keyword: string) {
    // Nếu không có API search → không xử lý (để ng zorro tự lọc local)
    if (!this.apiFnStream) return;
    this.searchSubject.next(keyword);
  }

  // --- Data loading ---
  private loadData(): Subscription {
    const apiFn = this.apiFnAll || this.apiFnStream;
    if (!apiFn) return new Subscription();

    this.loading = true;
    const params: IParamsSearch = { page: this.page, size: this.size };

    const apiCall = this.apiFnAll
      ? this.apiFnAll(this.apiFnAll.length > 0 ? params : undefined)
      : apiFn(params);

    return apiCall
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((res: any) => {
        this.mergeDataToList(res?.data || []);
      });
  }

  private mergeDataToList(newData: IOptionModel[]) {
    newData.forEach((item) => this.listMap.set(item.value, item));
    this.list = Array.from(this.listMap.values());
  }

  onScrollEnd() {
    if (!this.apiFnAll) {
      this.page++;
      this.loadData();
    }
  }

  // --- Select behavior ---
  onSelectChange(selected: any) {
    this.value = selected;
    this.onChange(this.getEmitValue(selected));
    this.onTouched();
  }

  onOpenChange(e: any) {
    console.log('open change', e)
    this.isOpenChange = e;
    this.openChange.emit(e);
    e ? this.focus.emit() : this.blur.emit();
    this.onTouched();
  }

  private getEmitValue(selected: any) {
    if (!this.emitObject) return selected;

    if (this.mode === 'multiple') {
      return (selected || [])
        .map((id: any) => this.listMap.get(id))
        .filter(Boolean);
    }

    return this.listMap.get(selected) || null;
  }

  private ensureSelectedItemsLoaded(ids: any[]) {
    const missingIds = ids.filter((id) => !this.listMap.has(id));
    if (!missingIds.length || !this.apiByIdFn) return;

    const param = missingIds.length === 1 ? missingIds[0] : missingIds;
    this.apiByIdFn(param).subscribe((res: any) => {
      this.mergeDataToList(res?.data || []);
    });
  }

  // --- CVA ---
  writeValue(value: any): void {
    const ids = this.extractIds(value);
    this.value = this.mode === 'multiple' ? ids : (ids[0] ?? null);

    // Nếu list có sẵn từ ngoài => không gọi API loadData
    if (this.list.length) {
      if (ids.length) this.ensureSelectedItemsLoaded(ids);
      return;
    }

    // Nếu không có list => gọi API load lần đầu
    this.loadData().add(() => {
      if (ids.length) this.ensureSelectedItemsLoaded(ids);
    });
  }

  private extractIds(value: any): any[] {
    if (value == null) return [];

    if (this.mode === 'multiple') {
      const arr = Array.isArray(value) ? value : [];
      return this.emitObject
        ? arr.map((v) => v?.value).filter((v) => v != null)
        : arr;
    }

    const id =
      this.emitObject && typeof value === 'object' ? value?.value : value;
    return id != null ? [id] : [];
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }


}
