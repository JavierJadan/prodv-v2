import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageMainMenuPage } from './page-main-menu.page';

const routes: Routes = [
  {
    path: 'page-main-menu',
    component: PageMainMenuPage,
    children: [
      {
        path: 'page-local',
        loadChildren: () => import('./../../pages/page-local/page-local.module').then(m => m.PageLocalPageModule)
      },
      {
        path: 'page-internacional',
        loadChildren: () => import('./../../pages/page-internacional/page-internacional.module').then(m => m.PageInternacionalPageModule)
      },
      {
        path: 'page-liga-pro',
        loadChildren: () => import('./../../pages/page-liga-pro/page-liga-pro.module').then(m => m.PageLigaProPageModule)
      },
      {
        path: 'page-profile',
        loadChildren: () => import('./../../pages/page-profile/page-profile.module').then( m => m.PageProfilePageModule)
      },
      {
        path:'',
        redirectTo: 'page-main-menu/page-local',
        pathMatch: 'full'
      }
    ]
  },
  {
    path:'',
    redirectTo: 'page-main-menu/page-local',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageMainMenuPageRoutingModule { }
