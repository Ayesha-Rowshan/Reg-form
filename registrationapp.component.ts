import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrationapp',
  templateUrl: './registrationapp.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class RegistrationappComponent {
  @Input() studentToEdit: any = null;
  @Output() onSubmitStudent = new EventEmitter<any>();
  @Output() onClose = new EventEmitter<void>();

  studentForm: FormGroup;
  isModalOpen = false;
  formSubmitted = false; 

  departments = ['IT', 'CSE', 'EEE'];

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group(
      {
        name: ['', Validators.required],
        fatherName: ['', Validators.required],
        gender: ['', Validators.required],
        dob: ['', Validators.required],
        department: ['', Validators.required],
        address: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/),
          ],
        ],
        confirmPassword: ['', Validators.required],
        agreeTerms: [false, Validators.requiredTrue],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['studentToEdit'] && this.studentToEdit) {
      this.studentForm.patchValue({
        name: this.studentToEdit.name || '',
        fatherName: this.studentToEdit.fatherName || '',
        gender: this.studentToEdit.gender || '',
        dob: this.studentToEdit.dob || '',
        department: this.studentToEdit.department || '',
        address: this.studentToEdit.address || '',
        email: this.studentToEdit.email || '',
        password: '',
        confirmPassword: '',
        agreeTerms: this.studentToEdit.agreeTerms || false,
      });
    } else {
      this.studentForm.reset(); 
    }
  }
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { mismatch: true }
      : null;
  }

  addOrUpdateStudent() {
    this.formSubmitted = true;

    if (this.studentForm.valid) {
      this.onSubmitStudent.emit(this.studentForm.value);
      this.closeRegistrationForm();
    } else {
      this.studentForm.markAllAsTouched();
    }
  }

  closeRegistrationForm() {
    this.onClose.emit();
  }
}
