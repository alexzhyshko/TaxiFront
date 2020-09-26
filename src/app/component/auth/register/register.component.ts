import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { AuthService } from "../../../service/shared/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupRequestPayload;
  signupForm: FormGroup;
  authService: AuthService;

  constructor(authService: AuthService, private router: Router,
    private toastr: ToastrService) {
    this.authService = authService;
    this.signupRequestPayload = {
      username: '',
      name: '',
      surname: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  register() {
    this.signupRequestPayload.username = this.signupForm.get('username').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;
    this.signupRequestPayload.name = this.signupForm.get('name').value;
    this.signupRequestPayload.surname = this.signupForm.get('surname').value;
    this.authService.register(this.signupRequestPayload).subscribe(
      (data) => {
        this.toastr.success(data);
        this.router.navigate(['/login'], { queryParams: { registered: true } })
      },
      (err) => {
        this.toastr.error(err.error);
      }
    );
  }

}
