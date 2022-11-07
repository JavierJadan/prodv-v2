import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageEquiposCampeonatoPageRoutingModule } from './page-equipos-campeonato-routing.module';

import { PageEquiposCampeonatoPage } from './page-equipos-campeonato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageEquiposCampeonatoPageRoutingModule
  ],
  declarations: [PageEquiposCampeonatoPage]
})
export class PageEquiposCampeonatoPageModule {}
