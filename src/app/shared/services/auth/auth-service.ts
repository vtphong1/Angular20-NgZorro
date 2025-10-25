import {inject, Injectable} from '@angular/core';
import {of} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private router = inject(Router);

  logOut(): void {
    this.router.navigate(['/auth/login']);
  }

  loadRole() {
    return of(true);
  }
}
