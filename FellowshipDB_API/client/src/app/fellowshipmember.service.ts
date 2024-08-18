import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fellowshipmember } from './fellowshipmember';

@Injectable({
  providedIn: 'root'
})
export class FellowshipmemberService {
  private url = 'http://localhost:5200/fellowshipmembers';
  fellowshipmembers$ = signal<Fellowshipmember[]>([]);
  fellowshipmember$ = signal<Fellowshipmember | null>(null); 

  constructor(private httpClient: HttpClient) {}

  refreshFellowshipmembers() {
    this.httpClient.get<Fellowshipmember[]>(`${this.url}`).subscribe(fellowshipmembers => {
      this.fellowshipmembers$.set(fellowshipmembers); 
    });
  }

  refreshFellowshipmember(id: string) {
    this.httpClient.get<Fellowshipmember>(`${this.url}/${id}`).subscribe(fellowshipmember => {
      this.fellowshipmember$.set(fellowshipmember);  
    });
  }

  getFellowshipmembers() {
    this.refreshFellowshipmembers();
    return this.fellowshipmembers$;  
  }

  getFellowshipmember(id: string) {
    this.refreshFellowshipmember(id);
    return this.fellowshipmember$; 
  }

  createFellowshipmember(fellowshipmember: Fellowshipmember) {
    return this.httpClient.post(`${this.url}`, fellowshipmember, { responseType: 'text' });
  }

  updateFellowshipmember(id: string, fellowshipmember: Fellowshipmember) {
    return this.httpClient.put(`${this.url}/${id}`, fellowshipmember, { responseType: 'text' });
  }

  deleteFellowshipmember(id: string) {
    return this.httpClient.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  // Query: Helm's Deep Winners
  queryHelmsDeepWinners() {
    const helmsDeepWinners$ = signal<Fellowshipmember[]>([]);
    this.httpClient.get<Fellowshipmember[]>(`${this.url}/helms-deep-winners`).subscribe(data => {
      helmsDeepWinners$.set(data);
    });
    return helmsDeepWinners$;
  }

  // Query: Pelennor Winners
  queryPelennorWinners() {
    const pelennorWinners$ = signal<Fellowshipmember[]>([]);
    this.httpClient.get<Fellowshipmember[]>(`${this.url}/pelennor-winners`).subscribe(data => {
      pelennorWinners$.set(data);
    });
    return pelennorWinners$;
  }

  // Query: Refused the Ring
  queryRefusedRing() {
    const refusedRing$ = signal<Fellowshipmember[]>([]);
    this.httpClient.get<Fellowshipmember[]>(`${this.url}/refused-the-ring`).subscribe(data => {
      refusedRing$.set(data);
    });
    return refusedRing$;
  }

  // Query: Total-Kills
  queryTotalKills() {
    const totalKills$ = signal<Fellowshipmember[]>([]);
    this.httpClient.get<Fellowshipmember[]>(`${this.url}/sort-by-total-kills`).subscribe(data => {
      totalKills$.set(data);
    });
    return totalKills$;
  }

  // Query: Hobbits
  queryHobbits() {
    const yaknowHobbits$ = signal<Fellowshipmember[]>([]);
    this.httpClient.get<Fellowshipmember[]>(`${this.url}/hobbits`).subscribe(data => {
      yaknowHobbits$.set(data);
    });
    return yaknowHobbits$;
  }
}
