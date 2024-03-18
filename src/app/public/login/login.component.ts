import { Component, OnInit } from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BasicUser} from "../../models/basic-user";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoggedIn: boolean = false;
  loginForm!: FormGroup;
  user!: BasicUser;
  isLoading!: boolean;

  ngOnInit() {
    this.loginForm = this.getLoginForm()
  }

  constructor(private authService: AuthService, private router: Router, private alert: AlertService, private fb: FormBuilder) {
  }

  getLoginForm() {
    return this.fb.group({
      email: ['', Validators.email],
      password: [''],
    })
  }

  onSubmit() {
    this.isLoading = true;
    this.user = this.loginForm.value;
    this.authService.logout();
    this.authService.login(this.user).subscribe({
        next: (data: any) => {
          let jwtToken = data.token;
          this.authService.saveToken(jwtToken);
          if (this.authService.getRoles().includes("admin") || this.authService.getRoles().includes("manager")) {
            this.isLoading = false;
            this.router.navigate(['dashboard']);
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.alert.alertError(err.error !== null ? err.error.message : "une erreur s'est produite!");
          this.isLoading = false;
        }
      }
    );
  }
}
