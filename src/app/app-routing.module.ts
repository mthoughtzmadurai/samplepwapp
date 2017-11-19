import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { ArchitectComponent } from './components/architect/architect.component';
import { BuildingComponent } from './components/building/building.component';

import { AuthGuard } from './services/auth.guard.service';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'architects',
    component: ArchitectComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'architects/:id/buildings',
    component: BuildingComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: '**',
    redirectTo: 'HomeComponent',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only //this thing sucks
    ),
  ],
  exports: [
    RouterModule
  ],
  providers: [],
})
export class AppRoutingModule { }
