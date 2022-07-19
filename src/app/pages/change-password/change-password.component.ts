import {Component, OnInit} from '@angular/core';
import {UserDiarioData} from '../../@core/data/user.diario';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageUtils} from '../../@theme/messages/message-utils';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-profile',
  styleUrls: ['./change-password.component.scss'],
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;

  constructor(
    private userService: UserDiarioData,
    private messageUtils: MessageUtils,
    private router: Router,
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.messageUtils.showFormErrors(this.form.controls);
      return;
    }
    if (this.form.controls['password'].value !== this.form.controls['confirmPassword'].value) {
      this.messageUtils.showError('Nova senha e confirmação não são iguais.');
    }

    this.updatePassword();
  }

  private updatePassword() {
    this.userService.changePassword(this.form.value)
      .subscribe(x => {
        this.messageUtils.showSuccess('Perfil atualizado com sucesso');
        this.router.navigateByUrl('/auth/logout');
      });
  }

}
