import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeBodyComponent } from './components/home-body/home-body.component';
import { FooterComponent } from './components/footer/footer.component';
import { ServicesComponent } from './components/reservation/reservation.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { MaterialAppModule } from 'src/app/angular-material.module';
import { AdminModule } from './admin-module/admin.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: HomeBodyComponent },
      { path: 'services', component: ServicesComponent }, // услуги
      { path: 'profile', component: ProfileComponent }, // личный кабинет , доступен только авторизированным пользователям
      { path: 'contacts', component: ContactsComponent }, // контакты
      { path: 'portfolio', component: PortfolioComponent } // фото работ и описание работы
    ]
  },
  {
    path: 'admin',
    loadChildren: './admin-module/admin.module#AdminModule'
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    HomeBodyComponent,
    FooterComponent,
    ServicesComponent,
    ProfileComponent,
    ContactsComponent,
    PortfolioComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialAppModule,
    AdminModule
  ]
})
export class HomeModule {}
