import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development'
import { firstValueFrom } from 'rxjs';
import { NewUser, UserSelect, UserUpdate } from '../../../types/models/User.interface';
import { IResponse } from '../../../types/response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api = `${environment.api}/users`;


  constructor(private http: HttpClient) { }

  /*
  API Routes

  router.post('/login', UserController.login());
  router.get('/verify', UserController.verify());
  router.put('/changePassword/:id_user', UserController.changePassword())

  router.get('/', UserController.getUsers());
  router.get('/:user_id', UserController.getUserById());
  router.post('/register', UserController.createUser());
  router.put('/:user_id', UserController.updateUser());
  router.delete('/:user_id', UserController.deleteUser());
  */


  async login(val: string, password: string) {
    const url = `${this.api}/login`;

    return await firstValueFrom(this.http.post(url, { val, password })) as IResponse<{
      token: string;
      user: UserSelect;
    }>;
  }

  async verify() {
    const url = `${this.api}/verify`;

    return await firstValueFrom(this.http.get(url)) as IResponse<string>;
  }

  async changePassword(password: string, newpassword: string, repassword: string) {
    const url = `${this.api}/changePassword/`;

    return await firstValueFrom(this.http.put(url, { password, newpassword, repassword }));
  }

  async getUsers() {
    const url = `${this.api}/`;

    return await firstValueFrom(this.http.get(url)) as IResponse<UserSelect[]>;
  }

  async getUserById(id: number) {
    const url = `${this.api}/${id}`;

    return await firstValueFrom(this.http.get(url)) as IResponse<UserSelect>;
  }

  async register(newUser: NewUser) {
    const url = `${this.api}/register`;

    return await firstValueFrom(this.http.post(url, newUser)) as IResponse<UserSelect>;
  }

  async updateUser(user_id: number, userData: UserUpdate) {
    const url = `${this.api}/${user_id}`;

    return await firstValueFrom(this.http.put(url, userData)) as IResponse<UserSelect>;
  }

  async deleteUser(user_id: number) {
    const url = `${this.api}/${user_id}`;

    return await firstValueFrom(this.http.delete(url)) as IResponse<UserSelect>;
  }
}
