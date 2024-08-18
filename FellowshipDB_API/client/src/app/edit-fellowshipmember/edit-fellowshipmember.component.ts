import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fellowshipmember } from '../fellowshipmember';
import { FellowshipmemberService } from '../fellowshipmember.service';
import { MatCardModule } from '@angular/material/card';
import { FellowshipmemberFormComponent } from '../fellowshipmember-form/fellowshipmember-form.component';

@Component({
  selector: 'app-edit-fellowshipmember',
  standalone: true,
  imports: [FellowshipmemberFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Edit a Member</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-fellowshipmember-form
          (formSubmitted)="submitFellowshipmember($event)"
        ></app-fellowshipmember-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [],
})
export class EditFellowshipmemberComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fellowshipmemberService: FellowshipmemberService
  ) {}

  ngOnInit() {}

  submitFellowshipmember(fellowshipmember: Fellowshipmember) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fellowshipmemberService.updateFellowshipmember(id, fellowshipmember).subscribe({
        next: () => this.router.navigate(['/']),
        error: (error) => {
          alert('Failed to update fellowshipmember');
          console.error(error);
        }
      });
    } else {
      this.fellowshipmemberService.createFellowshipmember(fellowshipmember).subscribe({
        next: () => this.router.navigate(['/']),
        error: (error) => {
          alert('Failed to create fellowshipmember');
          console.error(error);
        }
      });
    }
  }
}
