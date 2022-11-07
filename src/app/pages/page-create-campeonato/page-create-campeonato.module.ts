import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageCreateCampeonatoPageRoutingModule } from './page-create-campeonato-routing.module';

import { PageCreateCampeonatoPage } from './page-create-campeonato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageCreateCampeonatoPageRoutingModule
  ],
  declarations: [PageCreateCampeonatoPage]
})
export class PageCreateCampeonatoPageModule {}
