import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { Fellowshipmember } from '../fellowshipmember';
import { FellowshipmemberService } from '../fellowshipmember.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fellowshipmembers-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  styles: [
    `
      table {
        width: 100%;
      }
      button:first-of-type {
        margin-right: 1rem;
      }
    `,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Fellowship List</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="fellowshipmembers$()">
          <!-- Columns Definitions -->
          <ng-container matColumnDef="col-name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let element">{{ element.name }}</td>
          </ng-container>
          <ng-container matColumnDef="col-alias">
            <th mat-header-cell *matHeaderCellDef>Position</th>
            <td mat-cell *matCellDef="let element">{{ element.alias }}</td>
          </ng-container>
          <ng-container matColumnDef="col-race">
            <th mat-header-cell *matHeaderCellDef>Race</th>
            <td mat-cell *matCellDef="let element">{{ element.race }}</td>
          </ng-container>
          <ng-container matColumnDef="col-helms">
            <th mat-header-cell *matHeaderCellDef>Helm's Deep Kills</th>
            <td mat-cell *matCellDef="let element">{{ element.helms_deep_kills }}</td>
          </ng-container>
          <ng-container matColumnDef="col-pelennor">
            <th mat-header-cell *matHeaderCellDef>Pelennor Fields Kills</th>
            <td mat-cell *matCellDef="let element">{{ element.pelennor_fields_kills }}</td>
          </ng-container>
          <ng-container matColumnDef="col-refuse">
            <th mat-header-cell *matHeaderCellDef>Refused the Ring</th>
            <td mat-cell *matCellDef="let element">{{ element.willingly_refused_the_ring_of_power }}</td>
          </ng-container>
          <ng-container matColumnDef="col-action">
            <th mat-header-cell *matHeaderCellDef>Action</th>
            <td mat-cell *matCellDef="let element">
              <button mat-raised-button [routerLink]="['edit/', element._id]">
                Edit
              </button>
              <button
                mat-raised-button
                color="warn"
                (click)="deleteFellowshipmember(element._id || '')"
              >
                Delete
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" [routerLink]="['new']">
          Add a New Member
        </button>
      </mat-card-actions>
    </mat-card>
    <br />

    <mat-card>
      <mat-card-header>
        <mat-card-title>Fellowship Stats</mat-card-title>
      </mat-card-header>
      <br />
      <ng-container>
        <button mat-raised-button [routerLink]="['helms-deep-winners']">Helm's Deep Winners</button>
      </ng-container>
      <ng-container>
        <button mat-raised-button [routerLink]="['pelennor-winners']">Pelennor Fields Winners</button>
      </ng-container>
      <ng-container>
        <button mat-raised-button [routerLink]="['sort-by-total-kills']">Sort by Total Kills</button>
      </ng-container>
      <ng-container>
        <button mat-raised-button [routerLink]="['refused-the-ring']">Refused the Ring</button>
      </ng-container>
      <ng-container>
        <button mat-raised-button [routerLink]="['hobbits']">Hobbits</button>
      </ng-container>
    </mat-card>
  `,
})
export class FellowshipmembersListComponent implements OnInit {
  fellowshipmembers$: WritableSignal<Fellowshipmember[]>;

  displayedColumns: string[] = [
    'col-name',
    'col-alias',
    'col-race',
    'col-helms',
    'col-pelennor',
    'col-refuse',
    'col-action',
  ];

  constructor(private fellowshipmemberService: FellowshipmemberService) {
    this.fellowshipmembers$ = this.fellowshipmemberService.fellowshipmembers$;
  }

  ngOnInit() {
    this.fellowshipmemberService.refreshFellowshipmembers();
  }

  deleteFellowshipmember(id: string): void {
    this.fellowshipmemberService.deleteFellowshipmember(id).subscribe({
      next: () => {
        this.fellowshipmemberService.refreshFellowshipmembers();
      },
    });
  }
}
