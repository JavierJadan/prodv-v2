import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/page-main-menu/page-main-menu.module').then( m => m.PageMainMenuPageModule)
  },
  {
    path: 'details/:leagueId/:id',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'auth/:mode',
    loadChildren: () => import('./pages/page-auth/page-auth.module').then(m => m.PageAuthPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
