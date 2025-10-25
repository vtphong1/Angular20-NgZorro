import {Component, inject} from '@angular/core';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {ActivatedRoute, NavigationEnd, Router, RouterModule} from '@angular/router';
import {filter} from 'rxjs';
import {CommonModule} from '@angular/common';
import {NzIconModule} from 'ng-zorro-antd/icon';

interface IBreadcrumb {
  label: string;
  url: string;
}


@Component({
  selector: 'app-breadcrumb',
  imports: [
    CommonModule,
    RouterModule,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzIconModule
  ],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss'
})
export class Breadcrumb {
  protected router = inject(Router);
  private route = inject(ActivatedRoute);

  breadcrumbs: IBreadcrumb[] = [];

  // dùng lifecycle hook thay vì constructor
  ngOnInit() {
    this.breadcrumbs = this.createBreadcrumbs(this.route.root);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.route.root);
      });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
    const children = route.children;

    if (!children || children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL) {
        url += `/${routeURL}`;
        const label = child.snapshot.data['title'] || routeURL;
        breadcrumbs.push({ label, url });
      }
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
