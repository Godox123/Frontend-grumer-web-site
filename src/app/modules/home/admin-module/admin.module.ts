import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialAppModule } from 'src/app/angular-material.module';
import { LeftBarComponent } from './admin-panel/components/left-bar/left-bar.component';
import { RightBarComponent } from './admin-panel/components/right-bar/right-bar.component';
import { UsersComponent } from './admin-panel/components/users/users.component';
import { ReservationsComponent } from './admin-panel/components/reservations/reservations.component';
import { SetPortfolioComponent } from './admin-panel/components/set-portfolio/set-portfolio.component';
import { CommentsService } from '../services/comments.service';
import { PortfolioCollectionService } from '../services/portfolio-collection.service';
import { ReservationService } from '../services/reservation.service';
import { UsersService } from '../services/users.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminPanelComponent,
    children: [
      { path: '', component: RightBarComponent },
      { path: 'users', component: UsersComponent },
      { path: 'reservations', component: ReservationsComponent },
      { path: 'portfolio', component: SetPortfolioComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AdminPanelComponent,
    LeftBarComponent,
    RightBarComponent,
    UsersComponent,
    ReservationsComponent,
    SetPortfolioComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialAppModule,
    HttpClientModule
  ],
  providers: [
    CommentsService,
    PortfolioCollectionService,
    ReservationService,
    UsersService
  ]
})
export class AdminModule {}
