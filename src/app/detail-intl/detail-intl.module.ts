import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailIntlPageRoutingModule } from './detail-intl-routing.module';

import { DetailIntlPage } from './detail-intl.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailIntlPageRoutingModule
  ],
  declarations: [DetailIntlPage]
})
export class DetailIntlPageModule {}
