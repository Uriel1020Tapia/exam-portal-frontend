
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppState } from 'src/app/interface/AppState';
import { CustomResponse } from 'src/app/interface/CustomResponse';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isHide = true;
  isValidForm = false;
  registerForm = this.fb.group( 
    {
      username:['test00',Validators.required],
      firstName:['test',Validators.required],
      lastName:['test'],
      email:['test@test.com', [Validators.required,Validators.email]],
      password:['sasa12',[Validators.required,Validators.minLength(6)]],
      phone:['1234567890',Validators.required]
    }
  )
  
  appState$: Observable<AppState<CustomResponse>> = new Observable<AppState<CustomResponse>>();
  
  constructor(
    private fb:FormBuilder,
    private router:Router,
    private userService:UserService,
    private notificationService:NotificationService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if (this.registerForm.valid) {
      this.isValidForm = true;

      console.log("request ==>",this.registerForm.value);

      this.userService.save$(this.registerForm.value)
      .subscribe((response)=>{
        console.log("response",response);
        this.notificationService.onSuccess(response.message)
      },(err) => {                              //Error callback
        console.error('error caught in component',err)
        this.notificationService.onError(err)
      });
    }
  }

}
