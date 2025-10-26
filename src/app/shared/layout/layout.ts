import {Component, inject} from '@angular/core';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {Breadcrumb} from './components/breadcrumb/breadcrumb';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {MenuItem} from './components/menu-item/menu-item';
import {CommonModule} from '@angular/common';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {HasAnyAuthority} from '../directives/has-any-authority';
import {IMenuLayout} from '../models/menu-layout';
import {MENU} from '@shared/constants/menu';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    Breadcrumb,
    RouterOutlet,
    NzMenuModule,
    NzIconModule,
    MenuItem,
    NzButtonModule,
    NzAvatarModule,
    NzDropDownModule,
    HasAnyAuthority
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
  router = inject(Router)
  isCollapsed = false;
  menuItems: IMenuLayout[] = MENU;
  protected readonly date = new Date();
}
