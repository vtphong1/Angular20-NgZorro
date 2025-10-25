import { NzIconService } from 'ng-zorro-antd/icon';
import { inject } from '@angular/core';

export function registerCustomIcons() {
  const iconService = inject(NzIconService);

  // Đăng ký icon tùy chỉnh triangle/circle/square
  iconService.addIconLiteral('custom-icon:triangle', `
    <svg viewBox="0 0 1024 1024" focusable="false">
      <path d="M512 0L1024 1024H0z" fill="#e53935"></path>
    </svg>
  `);

}
