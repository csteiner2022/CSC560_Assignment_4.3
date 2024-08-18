import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Fellowshipmember } from '../fellowshipmember';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fellowshipmember-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  styles: `
    .fellowshipmember-form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 2rem;
    }
    .mat-mdc-radio-button ~ .mat-mdc-radio-button {
      margin-left: 16px;
    }
    .mat-mdc-form-field {
      width: 100%;
    }
  `,
  template: `
    <form
      class="fellowshipmember-form"
      autocomplete="off"
      [formGroup]="fellowshipmemberForm"
      (submit)="submitForm()"
    >
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput placeholder="Name" formControlName="name" required />
        <mat-error *ngIf="name.invalid && name.touched">
          Name must be at least 3 characters long.
        </mat-error>
      </mat-form-field>
<br />
      <mat-form-field>
        <mat-label>Alias</mat-label>
        <input matInput placeholder="Alias" formControlName="alias" required />
        <mat-error *ngIf="alias.invalid && alias.touched">
          Name must be at least 3 characters long.
        </mat-error>
      </mat-form-field>
<br />

      <mat-radio-group formControlName="race" aria-label="Select an option">
        <mat-radio-button name="race" value="Mayar" required>
          Mayar
        </mat-radio-button>
        <mat-radio-button name="race" value="Elf" required>
          Elf
        </mat-radio-button>
        <mat-radio-button name="race" value="Man" required>
          Man
        </mat-radio-button>
        <mat-radio-button name="race" value="Dwarf" required>
          Dwarf
        </mat-radio-button>
        <mat-radio-button name="race" value="Hobbit" required>
          Hobbit
        </mat-radio-button>
      </mat-radio-group>
<br />
      <mat-form-field>
        <mat-label>Helm's Deep Kills</mat-label>
        <input matInput type="number" formControlName="helms_deep_kills" required />
        <mat-error *ngIf="helms_deep_kills.invalid && helms_deep_kills.touched">
          Must be numeric value.
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Pelennor Fields Kills</mat-label>
        <input matInput type="number" formControlName="pelennor_fields_kills" required />
        <mat-error *ngIf="pelennor_fields_kills.invalid && pelennor_fields_kills.touched">
          Must be numeric value.
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Willingly Refused the Ring?</mat-label>
        <input matInput placeholder="Yes or No" formControlName="willingly_refused_the_ring_of_power" required />
        <mat-error *ngIf="willingly_refused_the_ring_of_power.invalid && willingly_refused_the_ring_of_power.touched">
          Must Say Yes or No
        </mat-error>
      </mat-form-field>

      <br />
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="fellowshipmemberForm.invalid"
      >
        Add
      </button>
    </form>
  `,
})
export class FellowshipmemberFormComponent implements OnInit {
  @Input() initialState?: Fellowshipmember;

  @Output() formValuesChanged = new EventEmitter<Fellowshipmember>();
  @Output() formSubmitted = new EventEmitter<Fellowshipmember>();

  fellowshipmemberForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.fellowshipmemberForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      race: ['', Validators.required],
      alias: ['', [Validators.required, Validators.minLength(3)]],
      helms_deep_kills: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      pelennor_fields_kills: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      willingly_refused_the_ring_of_power: ['', [Validators.required, Validators.pattern('^(Yes|No)$')]],
    });

    if (this.initialState) {
      this.fellowshipmemberForm.setValue({
        name: this.initialState.name || '',
        alias: this.initialState.alias || '',
        helms_deep_kills: this.initialState.helms_deep_kills || '',
        pelennor_fields_kills: this.initialState.pelennor_fields_kills || '',
        willingly_refused_the_ring_of_power: this.initialState.willingly_refused_the_ring_of_power || '',
      });
    }
  }

  get name() {
    return this.fellowshipmemberForm.get('name')!;
  }
  get position() {
    return this.fellowshipmemberForm.get('position')!;
  }
  get alias() {
    return this.fellowshipmemberForm.get('alias')!;
  }
  get helms_deep_kills() {
    return this.fellowshipmemberForm.get('helms_deep_kills')!;
  }
  get pelennor_fields_kills() {
    return this.fellowshipmemberForm.get('pelennor_fields_kills')!;
  }
  get willingly_refused_the_ring_of_power() {
    return this.fellowshipmemberForm.get('willingly_refused_the_ring_of_power')!;
  }

  submitForm() {
   {
      this.formSubmitted.emit(this.fellowshipmemberForm.value as Fellowshipmember);
    }
  }
}
