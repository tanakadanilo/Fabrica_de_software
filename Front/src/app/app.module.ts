import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './tela/main/main.component';
import { MenuComponent } from './exports/tela/menu/menu.component';
import { PerfilPrestadorComponent } from './tela/perfil-prestador/perfil-prestador.component';
import { LoginComponent } from './tela/login/login.component';
import { MessageService } from 'primeng/api';
import { CadastroComponent } from './tela/cadastro-contratante/cadastro-contratante.component';
import { PerfilContratanteComponent } from './tela/perfil-contratante/perfil-contratante.component';
import { CadastroPrestadorComponent } from './tela/cadastro-prestador/cadastro-prestador.component';
import { ContratarComponent } from './tela/contratar/contratar.component';
import { CardModule } from 'primeng/card';
import { AvaliarComponent } from './tela/avaliar/avaliar.component';
import { HistoricoComponent } from './tela/historico/historico.component';
import { FinalizarContratacaoComponent } from './tela/finalizar-contratacao/finalizar-contratacao.component';
import { RecuperarSenhaComponent } from './tela/recuperar-senha/recuperar-senha.component';
import { TelaBaseComponent } from './exports/tela/tela-base/tela-base.component';
import { ContratoComponent } from './tela/contrato/contrato.component';
import { TextMaskModule } from 'angular2-text-mask';
import { MultiSelectModule } from 'primeng/multiselect';
import { AuthInterceptorService } from './exports/service/auth-interceptor.service';
import { FooterComponent } from './exports/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FooterComponent,
    MenuComponent,
    PerfilPrestadorComponent,
    LoginComponent,
    CadastroComponent,
    CadastroPrestadorComponent,
    PerfilContratanteComponent,
    ContratarComponent,
    AvaliarComponent,
    HistoricoComponent,
    FinalizarContratacaoComponent,
    RecuperarSenhaComponent,
    TelaBaseComponent,
    ContratoComponent,
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
    DropdownModule,
    PaginatorModule,
    DialogModule,
    CardModule,
    CalendarModule,
    MultiSelectModule,
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
