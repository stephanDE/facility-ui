import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  profileForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });

  isLoading: boolean = false;

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {

  }

  login() {
    this.isLoading = true;
    this.httpClient.post('/api/login', {
      credentials: this.profileForm.value
    }).subscribe(res => {
      // todo: write credentials in storage
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
    });
  }

}
