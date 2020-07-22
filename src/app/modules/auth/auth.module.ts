import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialAppModule } from 'src/app/angular-material.module';
import { RegistrationComponent } from './registration/registration.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { UserInterceptor } from './interceptors/user.interceptor';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ModalWindowSuccessComponent } from './reset/component/modal-window-success/modal-window-success.component';
import { ModalWindowFailedComponent } from './reset/component/modal-window-failed/modal-window-failed.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  { path: 'forgot', component: ForgotComponent, canActivate: [AuthGuard] },
  { path: 'reset/:token', component: ResetComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ForgotComponent,
    ResetComponent,
    ModalWindowSuccessComponent,
    ModalWindowFailedComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialAppModule,
    HttpClientModule
  ],
  entryComponents: [
    RegistrationComponent,
    ModalWindowSuccessComponent,
    ModalWindowFailedComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserInterceptor,
      multi: true
    }
  ]
})
export class AuthModule {}
