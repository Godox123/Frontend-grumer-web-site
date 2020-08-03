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
import { UsersService } from '../services/users.service';
import { HttpClientModule } from '@angular/common/http';
import { UserDeleteConfirmationComponent } from './admin-panel/components/users/components/user-delete-confirmation/user-delete-confirmation.component';
import { DeleteResponseMessagesComponent } from './admin-panel/components/users/components/delete-response-messages/delete-response-messages.component';
import { DeleteReservationModalComponent } from './admin-panel/components/reservations/components/delete-reservation-modal/delete-reservation-modal.component';
import { UpdateReservationModalComponent } from './admin-panel/components/reservations/components/update-reservation-modal/update-reservation-modal.component';
import { SetReservationModalComponent } from './admin-panel/components/reservations/components/set-reservation-modal/set-reservation-modal.component';
import { ConfirmationMessagesComponent } from './admin-panel/components/reservations/components/confirmation-messages/confirmation-messages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    SetPortfolioComponent,
    UserDeleteConfirmationComponent,
    DeleteResponseMessagesComponent,
    DeleteReservationModalComponent,
    UpdateReservationModalComponent,
    SetReservationModalComponent,
    ConfirmationMessagesComponent
  ],
  entryComponents: [
    UserDeleteConfirmationComponent,
    DeleteResponseMessagesComponent,
    DeleteReservationModalComponent,
    UpdateReservationModalComponent,
    SetReservationModalComponent,
    ConfirmationMessagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialAppModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UsersService]
})
export class AdminModule {}
