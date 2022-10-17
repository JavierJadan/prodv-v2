import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageLigaProPage } from './page-liga-pro.page';

const routes: Routes = [
  {
    path: '',
    component: PageLigaProPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageLigaProPageRoutingModule {}
