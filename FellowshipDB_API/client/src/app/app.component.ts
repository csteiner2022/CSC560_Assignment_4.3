import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FellowshipmembersListComponent } from './fellowshipmembers-list/fellowshipmembers-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FellowshipmembersListComponent, MatToolbarModule],
  styles: [
    `
      main {
        display: flex;
        justify-content: center;
        padding: 2rem 4rem;
      }
    `,
  ],
  template: `
    <mat-toolbar>
      <span>Fellowshipmembers Management System</span>
    </mat-toolbar>
    <main>
      <router-outlet />
    </main>
  `,
})
export class AppComponent {
  title = 'client';
}