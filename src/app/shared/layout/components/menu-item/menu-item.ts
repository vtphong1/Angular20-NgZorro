import {Component, inject, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {IMenuLayout} from '@shared/models/menu-layout';
import {HasAnyAuthority} from '@shared/directives/has-any-authority';
import {Router, RouterLinkActive, RouterModule} from '@angular/router';

@Component({
  selector: 'app-menu-item',
  imports: [
    CommonModule,
    NzMenuModule,
    NzIconModule,
    HasAnyAuthority,
    RouterModule
  ],
  templateUrl: './menu-item.html',
  styleUrl: './menu-item.scss',
})
export class MenuItem {
  router = inject(Router);
  @Input() isCollapsed = false;
  @Input() items: IMenuLayout[] = [];
  isActive(path?: string): boolean {
    // Kiểm tra path khớp với URL hiện tại
    return this.router.url === path || this.router.url.startsWith(path + '/');
  }

  isActiveParent(item?: any): boolean {
    if (!item?.children) return false;
    return item?.children?.some(
      (child: any) =>
        this.isActive(child?.path) ||
        this.isActiveParent(child) // đệ quy nếu có cấp sâu hơn
    );
  }

}
