import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.signUpForm = this.fb.group({
      'name': ['', Validators.required],
      'phone': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'confirm-pwd': ['', Validators.required]
    })
  }

  signUp() {
    this.http.post<any>("http://localhost:3000/signupUsers", this.signUpForm.value)
      .subscribe(res => {
        alert("Signup successful!!");
        this.signUpForm.reset();
        this.router.navigate(['login']);
      }, err => {
        alert("Something went wrong!!")
      })
  }

}
