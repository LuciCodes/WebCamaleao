import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppAuthenticationService } from 'src/app/services/appAuthentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  flagLoading: boolean = false;

  loginForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.compose([
      Validators.required, Validators.minLength(5)])
    ]
  });

  constructor(private appAuth: AppAuthenticationService,
              private fb: FormBuilder,
              private router: Router) {

    this.loginForm.controls.email.setValue('test@camaleao.co');

    this.loginForm.controls.password.setValue('teste123');
  }

  get emailErrorMessage(): string {
    
    return this.loginForm.controls.email.hasError('required') ? 'Campo obrigatório' : '';
  }

  get passwordErrorMessage(): string {
    
    return this.loginForm.controls.password.hasError('required') ? 'Campo obrigatório' :
            this.loginForm.controls.password.hasError('minlength') ? 'Deve ter ao menos 5 caracteres.' :
            '';
  }

  onSubmit() {

    //alert('Thanks!');

    if (this.loginForm.valid) {

      this.flagLoading = true;

      window.setTimeout(() => {

        this.appAuth.logUser(this.loginForm.value).then((userObj) => {

          this.flagLoading = false;

          if (userObj) {

            this.router.navigateByUrl('/');
          }
        });

      }, 1420);
    }
  }
}
