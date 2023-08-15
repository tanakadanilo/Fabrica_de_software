import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './tela/main/main.component';
import { MenuComponent } from './exports/tela/menu/menu.component';
import { PerfilComponent } from './tela/perfil/perfil.component';
import { LoginComponent } from './tela/login/login.component';
import { MessageService } from 'primeng/api';
import { CadastroComponent } from './tela/cadastro/cadastro.component';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MenuComponent,
    PerfilComponent,
    LoginComponent,
    CadastroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CarouselModule,
    ButtonModule,
    MenuModule,
    InputTextModule,
    FormsModule,
    DividerModule,
    InputTextModule,
    InputTextareaModule,
    PasswordModule,
    ToastModule,
    DropdownModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
