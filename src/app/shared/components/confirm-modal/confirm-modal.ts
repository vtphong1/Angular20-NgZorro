import {Component, inject, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NZ_MODAL_DATA, NzModalModule, NzModalRef} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-confirm-modal',
  imports: [
    CommonModule,
    NzButtonModule,
    NzModalModule
  ],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.scss',
})
export class ConfirmModal {
  modalRef = inject(NzModalRef);
  data = inject(NZ_MODAL_DATA);

}
