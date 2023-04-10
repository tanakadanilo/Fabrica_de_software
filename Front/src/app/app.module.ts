import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './exports/menu/menu.component';

import { FooterComponent } from './exports/footer/footer.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule } from '@nebular/theme';
import { NbInputModule } from '@nebular/theme';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbAuthModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
    NbEvaIconsModule,
    NbButtonModule,
    NbInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
