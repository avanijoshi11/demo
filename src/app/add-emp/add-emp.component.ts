import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {EmployeeService} from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent implements OnInit {

  empForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(private fb: FormBuilder, 
              private empService: EmployeeService, 
              private dialogRef: MatDialogRef<AddEmpComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              private coreService: CoreService) {

    this.empForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onSubmit() {
    if(this.empForm.valid) {
      if(this.data) {
        this.empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Employee updated successfully!');
            this.dialogRef.close(true);
          }, 
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this.empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Employee added successfully!');
            this.dialogRef.close(true);
          }, 
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
