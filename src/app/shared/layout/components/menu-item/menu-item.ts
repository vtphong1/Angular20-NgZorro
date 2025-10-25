import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {IMenuLayout} from '@shared/models/menu-layout';
import {HasAnyAuthority} from '@shared/directives/has-any-authority';

@Component({
  selector: 'app-menu-item',
  imports: [CommonModule, NzMenuModule, NzIconModule, HasAnyAuthority],
  templateUrl: './menu-item.html',
  styleUrl: './menu-item.scss',
})
export class MenuItem {
  @Input() isCollapsed = false;
  @Input() items: IMenuLayout[] = [];
}
