import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageEditPartidoPageRoutingModule } from './page-edit-partido-routing.module';

import { PageEditPartidoPage } from './page-edit-partido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageEditPartidoPageRoutingModule
  ],
  declarations: [PageEditPartidoPage]
})
export class PageEditPartidoPageModule {}
