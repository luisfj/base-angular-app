import {NgModule} from '@angular/core';
import {ChangePasswordComponent} from './change-password.component';
import {ThemeModule} from '../../@theme/theme.module';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule} from '@nebular/theme';
import {FormsRoutingModule} from '../forms/forms-routing.module';
import {FormsModule as ngFormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        ThemeModule,
        NbInputModule,
        NbCardModule,
        NbButtonModule,
        NbActionsModule,
        NbUserModule,
        NbCheckboxModule,
        NbRadioModule,
        NbDatepickerModule,
        FormsRoutingModule,
        NbSelectModule,
        NbIconModule,
        ngFormsModule,
        ReactiveFormsModule,
    ],
  declarations: [
    ChangePasswordComponent,
  ],
})
export class ChangePasswordModule { }
