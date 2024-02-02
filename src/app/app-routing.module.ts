import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterviewDashboardComponent } from './components/interview-dashboard/interview-dashboard.component';
import { PriceDashboardComponent } from './components/price-dashboard/price-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/interview', pathMatch: 'full' },
  {
    path: 'interview',
    component: InterviewDashboardComponent
  },
  {
    path: 'price',
    component: PriceDashboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
