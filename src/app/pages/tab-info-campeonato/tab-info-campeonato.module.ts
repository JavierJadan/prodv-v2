import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabInfoCampeonatoPageRoutingModule } from './tab-info-campeonato-routing.module';

import { TabInfoCampeonatoPage } from './tab-info-campeonato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabInfoCampeonatoPageRoutingModule
  ],
  declarations: [TabInfoCampeonatoPage]
})
export class TabInfoCampeonatoPageModule {}
