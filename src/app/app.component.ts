import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { ThemeState } from './states/theme/theme.state';
import { ConnectionService } from './services/connection/connection.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'playlist-maker';

  constructor(private _ts: ThemeState, private iconRegistry: MatIconRegistry, private _cs: ConnectionService, private _ms: MatSnackBar) {
    this.iconRegistry.setDefaultFontSetClass('material-symbols-outlined')
  }
  ngOnInit(): void {
    this._cs.checkConnection().subscribe({
      next: (res) => {
        this._ms.open('Connected to server', 'OK', {
          duration: 2000
        })
      }
    })
  }
}
