import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PortalModule } from '@angular/cdk/portal';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NbSecurityModule } from '@nebular/security';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbMenuService,
  NbSelectModule,
  NbSidebarModule,
  NbStepperModule,
  NbThemeModule,
  NbUserModule,
} from '@nebular/theme';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NbToastrModule } from '@nebular/theme';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './exports/footer/footer.component';
import { MenuComponent } from './exports/menu/menu.component';
import { LoginRoutingModule } from './login/login-routing.module';
import { LoginComponent } from './login/login.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { RegisterComponent } from './register/register.component';
import { PerfiluserComponent } from './perfiluser/perfiluser.component';
import { MainComponent } from './main/main.component';
import { AuthInterceptor } from './security/auth-interceptor';
import { RegisterPrestadorComponent } from './register-prestador/register-prestador.component';
import { PerfilprestadorComponent } from './perfilprestador/perfilprestador.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoggoutComponent } from './exports/loggout/loggout.component';
import { NbDialogModule } from '@nebular/theme';
import { ConfirmationDialogComponent } from './exports/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    LoginComponent,
    RecoveryComponent,
    RegisterComponent,
    PerfiluserComponent,
    MainComponent,
    RegisterPrestadorComponent,
    PerfilprestadorComponent,
    CadastrarComponent,
    LoggoutComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    NbThemeModule.forRoot(),
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
    NbInputModule,
    NgxMaskDirective,
    NgxMaskPipe,
    PortalModule,
    NbMenuModule.forRoot(),
    NbStepperModule,
    NbButtonModule,
    NbLayoutModule,
    ReactiveFormsModule,
    NbLayoutModule,
    HttpClientModule,
    NbSelectModule,
    NbToastrModule.forRoot(),
    BrowserAnimationsModule,
    NbDialogModule.forChild(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    NbMenuService,
    provideNgxMask(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  entryComponents: [ConfirmationDialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
