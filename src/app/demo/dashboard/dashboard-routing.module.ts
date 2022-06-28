import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommentComponent } from './comment/comment.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { HolidayComponent } from './holiday/holiday.component';
import { TimeslotComponent } from './timeslot/timeslot.component';


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
        path: 'appointments/:status',
        loadChildren: () => import('./appoinments/appoinments.module').then(m => m.AppoinmentsModule)
      },
      {
        path: 'allblogs',
        loadChildren: () => import('./all-blogs/all-blogs.module').then(m => m.AllBlogsModule)
      }
      ,
      {
        path: 'country',
        loadChildren: () => import('./country/country.module').then(m => m.CountryModule )
      },
      {
        path: 'feedback',
        loadChildren: () => import('./feedback/feedback.module').then(m => m.FeedbackModule )
      },
      {


        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'ratelist',
        loadChildren: () => import('./rate-list/rate-list.module').then(m => m.RateListModule)
      },
      {
        path: 'enquire',
        loadChildren: () => import('./enquire/enquire.module').then(m => m.EnquireModule)
      },
      
      
      {
        path: 'promocode',
        loadChildren: () => import('./promocode/promocode.module').then(m => m.PromocodeModule )
      },
      
      
      {
        path: 'contactd',
        loadChildren: () => import('./contactd/contactd.module').then(m => m.ContactdModule )
      },
      {
        path: 'blog',
        loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule )
      },
      {
        path: 'comment',
        loadChildren: () => import('./comment/comment.module').then(m => m.CommentModule )
      }
      


      ,
      {
        path: 'timeslot',
        component: TimeslotComponent
      },
      {
        path: 'holiday',
        component: HolidayComponent
      },
      {
        path: 'editBlog/:id',
        component: EditBlogComponent
      },
      {
        path: 'comment/:id',
        component: CommentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,FormsModule,ReactiveFormsModule]
})
export class DashboardRoutingModule { }
