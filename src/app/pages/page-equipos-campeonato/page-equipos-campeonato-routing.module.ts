import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageEquiposCampeonatoPage } from './page-equipos-campeonato.page';

const routes: Routes = [
  {
    path: '',
    component: PageEquiposCampeonatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageEquiposCampeonatoPageRoutingModule {}
