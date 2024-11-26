import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationappComponent } from './registrationapp/registrationapp.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RegistrationappComponent],
})
export class AppComponent implements OnInit {
  isModalOpen = false;
  studentToEdit: any = null; 
  studentData: any[] = []; 
  localStorageKey = 'studentData';

  ngOnInit() {
    const savedData = localStorage.getItem(this.localStorageKey);
    if (savedData) {
      this.studentData = JSON.parse(savedData);
    }
  }

  openRegistrationForm() {
    this.isModalOpen = true;
    this.studentToEdit = null;
  }

  closeRegistrationForm() {
    this.isModalOpen = false; 
  }

  addOrUpdateStudent(student: any) {
    if (this.studentToEdit) {
     const index = this.studentData.findIndex(
        (s) => s.email === this.studentToEdit.email
      );
      if (index > -1) {
        this.studentData[index] = student;
      }
    } else {
      this.studentData.push(student);
    }
     localStorage.setItem(this.localStorageKey, JSON.stringify(this.studentData));
    this.closeRegistrationForm();
  }

  editStudent(index: number) {
    this.studentToEdit = { ...this.studentData[index] }; 
    this.isModalOpen = true;
  }

  deleteStudent(index: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentData.splice(index, 1); 
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.studentData));
    }
  }
}
