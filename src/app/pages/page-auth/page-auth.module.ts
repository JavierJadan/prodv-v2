import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PageAuthPageRoutingModule } from './page-auth-routing.module';
import { PageAuthPage } from './page-auth.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PageAuthPageRoutingModule],
  declarations: [PageAuthPage]
})
export class PageAuthPageModule {}
