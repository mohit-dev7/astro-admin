import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./demo/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'basic',
        loadChildren: () => import('./demo/ui-elements/ui-basic/ui-basic.module').then(m => m.UiBasicModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'forms',
        loadChildren: () => import('./demo/pages/form-elements/form-elements.module').then(m => m.FormElementsModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'tables',
        loadChildren: () => import('./demo/pages/tables/tables.module').then(m => m.TablesModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'charts',
        loadChildren: () => import('./demo/pages/core-chart/core-chart.module').then(m => m.CoreChartModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'sample-page',
        loadChildren: () => import('./demo/extra/sample-page/sample-page.module').then(m => m.SamplePageModule),
        canActivate:[AuthGuard]
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then(m => m.AuthenticationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
