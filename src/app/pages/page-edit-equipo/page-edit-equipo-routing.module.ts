import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageEditEquipoPage } from './page-edit-equipo.page';

const routes: Routes = [
  {
    path: '',
    component: PageEditEquipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageEditEquipoPageRoutingModule {}
