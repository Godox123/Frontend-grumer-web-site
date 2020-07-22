import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './modules/home/home.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './core/state/reducers/reducers';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './core/state/effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './core/guards/auth.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HomeModule,
    AuthModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    EffectsModule.forRoot(effects)
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
