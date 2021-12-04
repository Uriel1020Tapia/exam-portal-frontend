import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { concatMap, flatMap, tap } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TokenstorageService } from 'src/app/services/tokenstorage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showProgress = false;
  isValidForm = false;
  loginForm = this.fb.group({
    username: ['user1', Validators.compose([Validators.required])],
    password: ['test1', [Validators.required, Validators.minLength(4)]],
  });

  // Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')

  isLoggedIn = false;
  roles: any = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginSvc: LoginService,
    private userSvc: UserService,
    private tokenStorageSvc: TokenstorageService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  //getter fields
  get f_Username() {
    return this.loginForm.get('username');
  }
  get f_Password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.showProgress = true;

      console.log('request ==>', this.loginForm.value);

      this.loginSvc
        .generateToken(this.loginForm.value)
        .pipe(
          tap((data: any) => this.tokenStorageSvc.saveToken(data.token)),
          concatMap(() => this.loginSvc.getCurrentUser())
        )
        .subscribe(
          (data: any) => {
            console.log('data User ==>', data);
            this.tokenStorageSvc.saveUser(data);

            const user = this.tokenStorageSvc.getUser();
            this.roles = user.authorities;

            for (let i = 0; i < this.roles.length; i++) {
              console.log('roles', this.roles[i]);

              if (this.roles[i].authority === 'NORMAL') {
                console.log('is normal');
                this.router.navigateByUrl('/user-dashboard');
              } else if (this.roles[i].authority === 'ADMIN') {
                console.log('is admin');
                this.router.navigateByUrl('/admin-dashboard');
              } else {
                console.log('no tiene roles');
                this.tokenStorageSvc.signOut();
              }
            }
            this.showProgress = true;
          },
          (err) => {
            console.error('error caught in component', err);
            this.notificationService.onError(err);
            this.showProgress = false;
          }
        );
    }
  }

  openResetPasswordDialog(): void {}
}
