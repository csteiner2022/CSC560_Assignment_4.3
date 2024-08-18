import { Routes } from '@angular/router';
import { FellowshipmembersListComponent } from './fellowshipmembers-list/fellowshipmembers-list.component';
import { AddFellowshipmemberComponent } from './add-fellowshipmember/add-fellowshipmember.component';
import { EditFellowshipmemberComponent } from './edit-fellowshipmember/edit-fellowshipmember.component';
import { QueryComponent } from './query/query.component';

export const routes: Routes = [
  { path: '', component: FellowshipmembersListComponent, title: 'Fellowshipmembers List' },
  { path: 'new', component: AddFellowshipmemberComponent },
  { path: 'edit/:id', component: EditFellowshipmemberComponent },
  { path: 'helms-deep-winners', component: QueryComponent, data: { title: 'Helm\'s Deep Winners', endpoint: 'helms-deep-winners' } },
  { path: 'pelennor-winners', component: QueryComponent, data: { title: 'Pelennor Fields Winners', endpoint: 'pelennor-winners' } },
  { path: 'refused-the-ring', component: QueryComponent, data: { title: 'Offered the One Ring, but Refused', endpoint: 'refused-the-ring' } },
  { path: 'sort-by-total-kills', component: QueryComponent, data: { title: 'Fellowship Members by Total Kills', endpoint: 'sort-by-total-kills' } },
  { path: 'hobbits', component: QueryComponent, data: { title: 'Fellowship Members who were Hobbits', endpoint: 'hobbits' } }
];
