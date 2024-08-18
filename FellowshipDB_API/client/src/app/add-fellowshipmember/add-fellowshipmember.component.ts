import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FellowshipmemberFormComponent } from '../fellowshipmember-form/fellowshipmember-form.component';
import { Fellowshipmember } from '../fellowshipmember';
import { FellowshipmemberService } from '../fellowshipmember.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-fellowshipmember',
  standalone: true,
  imports: [FellowshipmemberFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Add a New Member</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-fellowshipmember-form
          (formSubmitted)="addFellowshipmember($event)"
        ></app-fellowshipmember-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
export class AddFellowshipmemberComponent {
  constructor(
    private router: Router,
    private fellowshipmemberService: FellowshipmemberService
  ) {}

  addFellowshipmember(fellowshipmember: Fellowshipmember) {
    this.fellowshipmemberService.createFellowshipmember(fellowshipmember).subscribe({
      next: () => {
        this.fellowshipmemberService.getFellowshipmembers();
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        alert('Failed to create fellowshipmember');
        console.error(error);
      },
    });
  }
}
