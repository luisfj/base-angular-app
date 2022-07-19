import {Component, OnInit} from '@angular/core';
import {UserDiarioData} from '../../@core/data/user.diario';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageUtils} from '../../@theme/messages/message-utils';

@Component({
  selector: 'ngx-profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  img: string;
  form: FormGroup;

  constructor(
    private userService: UserDiarioData,
    private messageUtils: MessageUtils,
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      imageUrl: new FormControl(this.img),
    });

    this.userService.getLoggedUser()
      .subscribe(x => {
        this.form.patchValue(x);
        this.img = x.imageUrl;
      });

  }

  onSubmit() {
    if (this.img !== this.form.controls['imageUrl'].value) {
      this.form.controls['imageUrl'].setValue(this.img);
    }
    if (this.form.invalid) {
      this.messageUtils.showFormErrors(this.form.controls);
      return;
    }

    // this.loading = true;
    this.updateUser();
  }

  loadImage() {
    this.img = this.form.controls['imageUrl'].value;
  }

  private updateUser() {
    this.userService.update(this.form.value)
      .subscribe(x => {
        this.userService.forceUpdateLoggedUser();
        this.messageUtils.showSuccess('Perfil atualizado com sucesso');
      });
  }

}
