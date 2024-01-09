import { Injectable, signal } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeState {

  private _value = signal('light')

  get value() {
    return this._value.asReadonly()
  }

  constructor() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setTheme('dark')
    } else {
      this.setTheme('light')
    }
  }

  setTheme(theme: 'light' | 'dark') {
    this._value = signal(theme)

    if (theme === 'dark') {
      document.body.classList.toggle('dark');
    } else {
      document.body.classList.toggle('light');
    }
  }
}
