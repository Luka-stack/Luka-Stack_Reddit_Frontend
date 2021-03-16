import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { LoginRequestPayload } from './login-request.paypload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isError: boolean = false;
  loginForm!: FormGroup;
  loginRequest: LoginRequestPayload;
  registerSuccessMessage: string = '';

  constructor(private authSerivce: AuthService, private activatedRoute: ActivatedRoute,
              private router: Router, private toastr: ToastrService) 
  { 
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

    this.activatedRoute.queryParams.subscribe(params => {
      if (params.registered !== undefined && params.registered === 'true') {
        this.toastr.success('Signup Successful');
        this.registerSuccessMessage = 'Please check your inbox for activation email. Activate you account before you Login!';
      }
    });
  }

  login(): void {
    this.loginRequest.username = this.loginForm.get('username')?.value;
    this.loginRequest.password = this.loginForm.get('password')?.value;

    this.authSerivce.login(this.loginRequest).subscribe(() => {
      this.isError = false;
      this.router.navigateByUrl('/');
      this.toastr.success('Login Successful');
    }, () => {
      this.isError = true;
    })
  }
}
