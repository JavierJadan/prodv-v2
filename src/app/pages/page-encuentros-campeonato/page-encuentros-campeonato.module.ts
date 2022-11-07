import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageEncuentrosCampeonatoPageRoutingModule } from './page-encuentros-campeonato-routing.module';

import { PageEncuentrosCampeonatoPage } from './page-encuentros-campeonato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageEncuentrosCampeonatoPageRoutingModule
  ],
  declarations: [PageEncuentrosCampeonatoPage]
})
export class PageEncuentrosCampeonatoPageModule {}
