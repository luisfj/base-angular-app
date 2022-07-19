import {Injectable, OnInit} from '@angular/core';
import {IndividualConfig, ToastrService} from 'ngx-toastr';
import {AbstractControl} from '@angular/forms';
import {ErrorField} from '../../@interceptors/error-interceptor';

@Injectable()
export class MessageUtils implements OnInit {
  translateMap: {[p: string]: string} = {
    'name': 'Nome',
    'oldPassword': 'Senha atual',
    'password': 'Senha',
    'confirmPassword': 'Confirmação de senha',
  };

  constructor(private toast: ToastrService) {
  }

  config:  Partial<IndividualConfig>  = {
    enableHtml: true,
    tapToDismiss: true,
    disableTimeOut: true,
    newestOnTop: true,
  };

  configTimeout:  Partial<IndividualConfig>  = {
    enableHtml: true,
    tapToDismiss: true,
    newestOnTop: true,
    timeOut: 5000  };

  showFormErrors(controls: {[p: string]: AbstractControl}) {
    let errors: string = '<ul>';
    Object.keys(controls)
      .filter(key => controls[key].invalid)
      .forEach(key => {
        Object.keys(controls[key].errors).forEach(keyError => {
          errors = errors.concat(`<li><strong><span class="text-capitalize">${this.translateField(key)}</span>:</strong> ${this.convertConstraintToPt(keyError)}</li>`);
        });
      });
    errors = errors.concat('</ul>');

    this.showError(errors);
  }

  showError(message: string) {
    this.toast.error(message, 'Atenção!', this.config);
  }

  showSuccess(message: string) {
    this.toast.success(message, 'Sucesso!', this.configTimeout);
  }

  showWarning(message: string) {
    this.toast.warning(message, 'Atenção!', this.config);
  }

  showInfo(message: string) {
    this.toast.warning(message, 'Info!', this.configTimeout);
  }

  showAppError(errors: ErrorField[]) {
    if (errors.length === 1) {
      this.toast.error(errors[0].message, errors[0].field, this.config);
    } else {
      let message: string;
      message = 'teste';
      this.toast.error(message, 'Atenção!', this.config);
    }
  }

  ngOnInit(): void {
  }

  private convertConstraintToPt(key: string) {
    switch (key) {
      case 'required':
        return 'obrigatório';
      default:
        return key;
    }
  }

  private translateField(key: string) {
    let translated: string;
    translated = this.translateMap[key];
    return translated ?? `?? ${key} ??`;
  }
}
