import { Injectable } from '@angular/core';
import {delay, Observable, of} from 'rxjs';
import {IResponse} from '@core/bases/model';

export interface IParamsSearch {
  page: number,
  size: number,
  keyword?: string,
  [key: string]: any;
}

export type IResponseOption<T> = {
  data: T;
} & Partial<Pick<IResponse<T>, 'code' | 'message'>>;

@Injectable({
  providedIn: 'root'
})
export class UiConfigService {

  fakeData: any[] = Array.from({ length: 100 }, (_, i) => ({
    value: i + 1,
    label: `Item ${i + 1}`,
    email: 'email'
  }));


  loadAllUser(params?: IParamsSearch): Observable<IResponseOption<any[]>> {
    return of({data: this.fakeData});
  }

  searchUser(params: IParamsSearch): Observable<IResponseOption<any[]>> {
    const page = params?.page;
    const pageSize = params?.size;
    const start = (page) * pageSize;
    const end = start + pageSize;

    // Cắt mảng theo trang
    const pagedData = this.fakeData.slice(start, end);
    console.log('load data ...')
    // Giả lập độ trễ như gọi API thật
    return of({
      data: pagedData,
    }).pipe(
      delay(300)
    );
  }

  searchUserById(id: any): Observable<IResponseOption<any>> {
    const abc = Array.isArray(id) ? id : [id];
    const data = this.fakeData.filter(x => abc?.includes(x.value));
    return of({ data });

  }
}
