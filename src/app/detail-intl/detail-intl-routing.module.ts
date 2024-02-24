import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailIntlPage } from './detail-intl.page';

const routes: Routes = [
  {
    path: '',
    component: DetailIntlPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailIntlPageRoutingModule {}
