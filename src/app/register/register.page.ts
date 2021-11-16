import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder,Validators } from "@angular/forms";
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  constructor(private FB: FormBuilder,
              private AS: AuthService,
              private router: Router,
              private AC: AlertController) {
                this.buildForm();
               }

  ngOnInit() {
  }

  async signupUser(event: Event){
    event.preventDefault();
    if(this.registerForm.valid){
      const value = this.registerForm.value;
      this.AS.signAuth(value.email, value.password).then(()=>{
      this.router.navigateByUrl('/login');
    },   async error => {const alert= await this.AC.create({message: error.message, buttons:[{text:'ok',role:'cancel'}],});
    await alert.present();
    });
    }
  }

  private buildForm(){
    this.registerForm = this.FB.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength]],
    });

  }

  get emailField(){
    return this.registerForm.get('email');
  }

  get passwordField(){
    return this.registerForm.get('password');
  }

}
