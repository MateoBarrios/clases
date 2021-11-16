import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder,Validators } from "@angular/forms";
import { AlertController } from "@ionic/angular";


@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {

  recoverForm: FormGroup;
  constructor(private FB: FormBuilder,
              private AS: AuthService,
              private router: Router,
              private AC: AlertController) {
                this.buildForm();
               }

  ngOnInit() {
  }

  async resetPassword(event: Event){
    event.preventDefault();
    if(this.recoverForm.valid){
      const value = this.recoverForm.value;
      this.AS.resetPassword(value.email).then(
      async ()=>{
        const alert = await this.AC.create({message: "revisa el correo, que te enviamos un enlace para cambiar la contraseña", 
        buttons:[{text:'ok',role:'cancel',handler:()=>{this.router.navigateByUrl('/login');}}], });
        await alert.present();
    },   async error => {const Erroralert= await this.AC.create({message: error.message, buttons:[{text:'ok',role:'cancel'}],});
    
    await Erroralert.present();
    });
    }
  }


  private buildForm(){
    this.recoverForm = this.FB.group({
      email: ['',[Validators.required, Validators.email]],
    });

  }

  get emailField(){
    return this.recoverForm.get('email');
  }


}
