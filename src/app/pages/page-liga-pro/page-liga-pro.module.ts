import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageLigaProPageRoutingModule } from './page-liga-pro-routing.module';

import { PageLigaProPage } from './page-liga-pro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageLigaProPageRoutingModule
  ],
  declarations: [PageLigaProPage]
})
export class PageLigaProPageModule {}
