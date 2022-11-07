import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageEditCampeonatoPageRoutingModule } from './page-edit-campeonato-routing.module';

import { PageEditCampeonatoPage } from './page-edit-campeonato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageEditCampeonatoPageRoutingModule
  ],
  declarations: [PageEditCampeonatoPage]
})
export class PageEditCampeonatoPageModule {}
