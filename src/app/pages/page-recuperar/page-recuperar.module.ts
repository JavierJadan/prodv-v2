import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageRecuperarPageRoutingModule } from './page-recuperar-routing.module';

import { PageRecuperarPage } from './page-recuperar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageRecuperarPageRoutingModule
  ],
  declarations: [PageRecuperarPage]
})
export class PageRecuperarPageModule {}
