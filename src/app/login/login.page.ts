import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder,Validators } from "@angular/forms";
import { AlertController } from "@ionic/angular";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  constructor(private FB: FormBuilder,
              private AS: AuthService,
              private router: Router,
              private AC: AlertController) {
                this.buildForm();
               }

  ngOnInit() {}

  async loginUser(event: Event){
    event.preventDefault();
    if(this.loginForm.valid){
      const value = this.loginForm.value;
      this.AS.loginUser(value.email, value.password).then(()=>{
      this.router.navigateByUrl('/home');
    },   async error => {const alert= await this.AC.create({message: error.message, buttons:[{text:'ok',role:'cancel'}],});
    await alert.present();
    });
    }
  }

  private buildForm(){
    this.loginForm = this.FB.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength]],
    });

  }

  get emailField(){
    return this.loginForm.get('email');
  }

  get passwordField(){
    return this.loginForm.get('password');
  }

}
