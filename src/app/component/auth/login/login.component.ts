import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../service/shared/auth.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRequest } from "../../../dto/request/LoginRequest";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authService: AuthService;
  loginRequest: LoginRequest;
  loginForm: FormGroup;
  registerSuccessMessage: string;
  isError: boolean;

  constructor(authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute,
    private toastr: ToastrService) {
      this.authService = authService;
      this.loginRequest = {
        username: '',
        password: ''
      };
    }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this.toastr.success('Signup Successful');
          this.registerSuccessMessage = 'Please Check your inbox for activation email '
            + 'activate your account before you Login!';
        }
      });
  }

  login(){
    console.log(this.loginRequest);

    this.loginRequest.username = this.loginForm.get('username').value;
    this.loginRequest.password = this.loginForm.get('password').value;
    this.authService.login(this.loginRequest).subscribe(data => {
      if (data) {
        this.isError = false;
        this.toastr.success('Login Successful');
        window.location.replace("/");
      } else {
        this.isError = true;
      }
    });
  }



}
