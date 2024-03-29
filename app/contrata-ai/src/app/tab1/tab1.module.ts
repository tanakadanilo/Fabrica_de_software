import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { ModalPrestadorComponent } from './modal-prestador/modal-prestador.component';
import { ModalContratarComponent } from './modal-contratar/modal-contratar.component';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    DropdownModule,
  ],
  declarations: [Tab1Page, ModalPrestadorComponent, ModalContratarComponent],
})
export class Tab1PageModule {}
