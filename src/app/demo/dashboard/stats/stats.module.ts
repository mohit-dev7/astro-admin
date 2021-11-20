import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {SharedModule} from '../../../theme/shared/shared.module';
import { StatsComponent } from './stats.component';
import { StatsRoutingModule } from './stats-routing.module';


@NgModule({
  imports: [
    CommonModule,
    StatsRoutingModule,
    SharedModule
  ],
  declarations: [StatsComponent]
})
export class StatsModule { }
