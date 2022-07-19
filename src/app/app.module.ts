/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CoreModule} from './@core/core.module';
import {ThemeModule} from './@theme/theme.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import {
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
  NbAuthJWTInterceptor,
  NbAuthJWTToken,
  NbAuthModule,
  NbPasswordAuthStrategy,
} from '@nebular/auth';
import {APP_BASE_HREF} from '@angular/common';
import {AuthGuard} from './@auth/auth-guard';
import {LogoutComponent} from './@auth/logout/logout.component';
import {ToastrModule} from 'ngx-toastr';
import {MessageUtils} from './@theme/messages/message-utils';
import {ErrorInterceptor} from './@interceptors/error-interceptor';

@NgModule({
  declarations: [LogoutComponent, AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    ToastrModule.forRoot(),
    // NbChatModule.forRoot({
    //   messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    // }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,
            key: 'token',
          },
          // errors: {
          //   key: '',
          //   getter: (module: string, res: HttpErrorResponse, options: NbPasswordAuthStrategyOptions) =>
          //   {console.log('error auth ----'); console.log(res); return res;},
          // },
          // messages: {
          //   key: '',
          //   getter: (module: string, res: HttpResponse<Object>, options: NbPasswordAuthStrategyOptions) =>
          //   {console.log('messages auth ----'); console.log(res); return res;},
          // },
          baseEndpoint: 'http://localhost:8080/api/authentication',
           login: {
             endpoint: '/login',
             defaultErrors: ['Email/Senha incorreto. Tente novamente.'],
             defaultMessages: ['Logado com sucesso.'],
           },
           register: {
             endpoint: '/register',
             defaultErrors: ['Erro ao registrar novo usuário. Tente novamente.'],
             defaultMessages: ['Registrado com sucesso.'],
           },
           logout: {
            method: null,
            redirect:  {
              success: '/', // welcome page path
              failure: '/', // stay on the same page
            },
          },
          // requestPass: {
          //   endpoint: '/auth/request-pass',
          // },
          // resetPass: {
          //   endpoint: '/auth/reset-pass',
          // },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 500,
          strategy: 'email',  // strategy id key.
          rememberMe: true,   // whether to show or not the `rememberMe` checkbox
          showMessages: {     // show/not show success/error messages
            success: true,
            error: true,
          },
        },
        register: {
          redirectDelay: 1300,
          strategy: 'email',
          showMessages: {
            success: true,
            error: true,
          },
          terms: false,
        },
        logout: {
          redirectDelay: 0,
        },
      },
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthGuard, MessageUtils,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: function () { return false; } },
  ],
})
export class AppModule {
}
