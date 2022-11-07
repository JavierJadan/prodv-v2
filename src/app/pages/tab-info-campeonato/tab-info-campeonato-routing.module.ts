import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabInfoCampeonatoPage } from './tab-info-campeonato.page';

const routes: Routes = [
  {
    path: '',
    component: TabInfoCampeonatoPage,
    children: [
      {
        path: 'page-equipos-campeonato',
        loadChildren: () => import('./../../pages/page-equipos-campeonato/page-equipos-campeonato.module')
        .then( m => m.PageEquiposCampeonatoPageModule)
      },
      {
        path: 'page-encuentros-campeonato',
        loadChildren: () => import('./../../pages/page-encuentros-campeonato/page-encuentros-campeonato.module')
        .then( m => m.PageEncuentrosCampeonatoPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabInfoCampeonatoPageRoutingModule {}
