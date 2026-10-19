import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEsEc from '@angular/common/locales/es-EC';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiAuthInterceptor } from './core/services/api-auth.interceptor';
import { FormsModule } from '@angular/forms';
// import { ServiceWorkerModule } from '@angular/service-worker';

registerLocaleData(localeEsEc);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-EC' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: ApiAuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
