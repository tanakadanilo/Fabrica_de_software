import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbContextMenuModule,

  NbLayoutModule,
  NbMenuService,
  NbSidebarModule,
  NbThemeModule,
  NbUserModule
} from '@nebular/theme';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './exports/footer/footer.component';
import { MenuComponent } from './exports/menu/menu.component';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login/login-routing.module';
import { NbSecurityModule } from '@nebular/security';
import { RecoveryComponent } from './recovery/recovery.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    LoginComponent,
    RecoveryComponent,
    RegisterComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    NbThemeModule.forRoot({ name: 'default' }),
    RouterModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    LoginRoutingModule,
    NbSecurityModule,
    NbUserModule,
    NbContextMenuModule,
  ],
  providers: [NbMenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
