import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageCreateCampeonatoPage } from './page-create-campeonato.page';

const routes: Routes = [
  {
    path: '',
    component: PageCreateCampeonatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageCreateCampeonatoPageRoutingModule {}
