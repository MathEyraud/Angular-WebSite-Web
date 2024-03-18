import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)
  if (authService.isTokenExpired()) {
    authService.logout();
    router.navigateByUrl('/public/login')
    return false
  }
  if (!authService.getRoles().includes("admin") && !authService.getRoles().includes("manager")) {
    router.navigateByUrl('/public/login')
    return false
  }
  return true;
}