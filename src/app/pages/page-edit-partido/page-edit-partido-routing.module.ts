import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageEditPartidoPage } from './page-edit-partido.page';

const routes: Routes = [
  {
    path: '',
    component: PageEditPartidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageEditPartidoPageRoutingModule {}
