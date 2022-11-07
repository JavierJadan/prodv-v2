import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageEditEquipoPageRoutingModule } from './page-edit-equipo-routing.module';

import { PageEditEquipoPage } from './page-edit-equipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageEditEquipoPageRoutingModule
  ],
  declarations: [PageEditEquipoPage]
})
export class PageEditEquipoPageModule {}
