import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';
import {firebaseConfig} from 'src/app/credenciales';
import  firebase  from 'firebase/compat/app';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
firebase.initializeApp(firebaseConfig);
import { RegisterPage } from './register.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,ReactiveFormsModule,AngularFireAuthModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
