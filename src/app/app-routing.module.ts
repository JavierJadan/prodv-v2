import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/page-main-menu/page-main-menu.module').then( m => m.PageMainMenuPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'page-create-campeonato',
    loadChildren: () => import('./pages/page-create-campeonato/page-create-campeonato.module').then( m => m.PageCreateCampeonatoPageModule)
  },
  {
    path: 'tab-info-campeonato',
    loadChildren: () => import('./pages/tab-info-campeonato/tab-info-campeonato.module').then( m => m.TabInfoCampeonatoPageModule)
  },
  {
    path: 'page-edit-campeonato',
    loadChildren: () => import('./pages/page-edit-campeonato/page-edit-campeonato.module').then( m => m.PageEditCampeonatoPageModule)
  },  {
    path: 'page-edit-equipo',
    loadChildren: () => import('./pages/page-edit-equipo/page-edit-equipo.module').then( m => m.PageEditEquipoPageModule)
  },
  {
    path: 'page-edit-partido',
    loadChildren: () => import('./pages/page-edit-partido/page-edit-partido.module').then( m => m.PageEditPartidoPageModule)
  },
  {
    path: 'page-recuperar',
    loadChildren: () => import('./pages/page-recuperar/page-recuperar.module').then( m => m.PageRecuperarPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
