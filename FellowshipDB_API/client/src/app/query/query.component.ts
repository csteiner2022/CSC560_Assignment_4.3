import { Component, OnInit, WritableSignal, signal, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FellowshipmemberService } from '../fellowshipmember.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-query',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule],
  template: `

	<a href="/">&lt; Back to Home</a>

    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ title }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="data$()">
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
          <ng-container matColumnDef="col-totalkills" *ngIf="displayTotalKills">
            <th mat-header-cell *matHeaderCellDef>Total Kills</th>
            <td mat-cell *matCellDef="let element">{{ element.total_kills }}</td>
          </ng-container>
          <ng-container matColumnDef="col-refuse">
            <th mat-header-cell *matHeaderCellDef>Refused the Ring</th>
            <td mat-cell *matCellDef="let element">{{ element.willingly_refused_the_ring_of_power }}</td>
          </ng-container>


          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    table {
      width: 100%;
    }
  `],
})
export class QueryComponent implements OnInit {
  title: string = '';
  data$!: WritableSignal<any[]>;
  displayedColumns: string[] = ['col-name', 'col-alias', 'col-race', 'col-helms', 'col-pelennor','col-refuse'];
  displayTotalKills = false;

  constructor(private route: ActivatedRoute, private fellowshipmemberService: FellowshipmemberService) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.title = data['title'];
      const endpoint = data['endpoint'];

      switch (endpoint) {
        case 'helms-deep-winners':
          this.data$ = this.fellowshipmemberService.queryHelmsDeepWinners();
          break;
        case 'pelennor-winners':
          this.data$ = this.fellowshipmemberService.queryPelennorWinners();
          break;
        case 'refused-the-ring':
          this.data$ = this.fellowshipmemberService.queryRefusedRing();
          break;
        case 'sort-by-total-kills':
	  this.displayTotalKills = true;
	  this.displayedColumns.push('col-totalkills');
          this.data$ = this.fellowshipmemberService.queryTotalKills();
          break;
        case 'hobbits':
          this.data$ = this.fellowshipmemberService.queryHobbits();
          break;
        default:
          break;
      }

      effect(() => {
        this.data$();
      });
    });
  }
}
