import { Injectable, signal } from '@angular/core';
import { IState } from '../../../types/state.inteface';
import { UserSelect } from '../../../types/models/User.interface';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

interface IAuth {
  token: string;
  user: UserSelect;
}
@Injectable({
  providedIn: 'root',
})
export class AuthState {
  state = signal<IState<IAuth>>({
    loading: false,
    value: null!,
    error: false,
  });

  constructor(private _as: UserService, private router: Router) { }

  async login(val: string, password: string) {
    this.state.update(v => {
      v.loading = true;
      return v;
    });
    try {
      const res = await this._as.login(val, password);

      if (res.error) {
        throw new Error(res.message);
      }

      this.state.update(v => {
        v.value = res.data;
        v.error = false;
        return v;
      })

    } catch (error) {
      this.state.update(v => {
        v.error = true;
        return v;
      });
      throw error;
    } finally {
      this.state.update(v => {
        v.loading = false;
        return v;
      });
    }
  }

  async verify() {
    this.state.update(v => {
      v.loading = true;
      return v;
    });
    try {
      const res = await this._as.verify();

      if (res.error) {
        throw new Error(res.message);
      }

      this.state.update(v => {
        v.error = false;
        return v;
      })

    } catch (error) {
      this.state.update(v => {
        v.error = true;
        return v;
      });
      throw error;
    } finally {
      this.state.update(v => {
        v.loading = false;
        return v;
      });

      if (this.state().error) {
        this.logout();
      }
    }
  }


  logout() {
    this.state.update(v => {
      v.value = null!;
      v.error = false;
      return v;
    })

    this.router.navigate(['/login']);
  }
}
