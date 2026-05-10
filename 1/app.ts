import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  studentForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, this.ageValidator]],
      password: ['', [Validators.required, this.passwordValidator]]
    });
  }

  ageValidator(control: AbstractControl): ValidationErrors | null {

    const age = control.value;

    if (age >= 18) {
      return null;
    }

    return { invalidAge: true };
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {

    const password = control.value;

    const pattern =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{6,}$/;

    if (pattern.test(password)) {
      return null;
    }

    return { invalidPassword: true };
  }

  onSubmit() {

    if (this.studentForm.valid) {
      alert('Form Submitted Successfully');
      console.log(this.studentForm.value);
    }
    else {
      this.studentForm.markAllAsTouched();
    }
  }
}