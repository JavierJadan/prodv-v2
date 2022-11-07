import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageEncuentrosCampeonatoPage } from './page-encuentros-campeonato.page';

const routes: Routes = [
  {
    path: '',
    component: PageEncuentrosCampeonatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageEncuentrosCampeonatoPageRoutingModule {}
