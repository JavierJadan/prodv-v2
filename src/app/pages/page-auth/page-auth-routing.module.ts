import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageAuthPage } from './page-auth.page';

const routes: Routes = [{ path: '', component: PageAuthPage }];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class PageAuthPageRoutingModule {}
