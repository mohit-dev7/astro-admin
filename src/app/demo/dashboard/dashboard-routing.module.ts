import { OrderModule } from './Order/order.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'default',
        loadChildren: () => import('./default/default.module').then(m => m.DefaultModule)
      },
      {
        path: 'stats',
        loadChildren: () => import('./stats/stats.module').then(m => m.StatsModule)
      },
      {
        path:"users",
        loadChildren:()=>import('./User/user.module').then(m => m.UserModule)
      },
      {
          path: 'order',
          loadChildren: () => import('./Order/order.module').then(m => m.OrderModule),
          // canActivate:[AuthGuard]
      },
      {
        path: 'product',
        loadChildren: () => import('./Product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'pending-appointments',
        loadChildren: () => import('./pending-appoinments/pending-appoinments.module').then(m => m.PendingAppoinmentsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
