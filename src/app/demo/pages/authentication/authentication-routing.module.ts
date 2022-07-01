import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'signup',
        loadChildren: () => import('./auth-signup/auth-signup.module').then(m => m.AuthSignupModule)
      },
      {
        path: 'signin',
        loadChildren: () => import('./auth-signin/auth-signin.module').then(m => m.AuthSigninModule)
      }
      ,
      {
        path: 'reset-password',
        loadChildren: () => import('./forget-password/forget-password.module').then(m => m.ForgetPasswordModule)
      }
      ,
      {
        path: 'changePassword',
        loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule)
      },
      {
        path: 'emailVerify',
        loadChildren: () => import('./email-varify/email-verify.module').then(m => m.EmailVerifyModule),
        
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
