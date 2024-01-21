import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { AuthState } from '../../states/auth/auth.state';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthState);

  if (req.url.includes('api')) {
    const token = localStorage.getItem('token');
    req.headers.set('Authorization', `Bearer ${token}`);
  }

  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        console.log(event.body);
      }
    }),
    catchError((err) => {
      if (err.status === 401) {
        localStorage.removeItem('token');
        auth.state.update(v => {
          v.value = {
            user: null!,
            token: "",
          };
          v.error = true;
          v.loading = false;
          return v;
        })
      }
      throw err;
    })
  );
};
