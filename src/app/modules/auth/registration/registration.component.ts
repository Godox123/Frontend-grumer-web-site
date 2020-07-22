import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/core/state/reducers/auth.reducer';
import { authActions } from 'src/app/core/state/actions/auth.actions';
import {
  RepeatPasswordValidator,
  RepeatPasswordEStateMatcher
} from '../validators/confirmed-password.validator';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {
  public hidePassword: boolean = true;

  public hideConfirmPassword: boolean = true;

  public RegistrationForm: FormGroup;

  public passwordsMatcher: RepeatPasswordEStateMatcher = new RepeatPasswordEStateMatcher();

  constructor(private fb: FormBuilder, private store$: Store<UserState>) {}

  public SignUp(): void {
    const {
      email,
      password,
      phone,
      username
    }: {
      email: string;
      password: string;
      phone: number;
      username: string;
    } = this.RegistrationForm.value;
    console.log(email, password);
    return this.store$.dispatch(
      authActions.signUpAction({ email, password, phone, username })
    );
  }

  public ngOnInit(): void {
    this.RegistrationForm = this.fb.group(
      {
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        passwordAgain: [null],
        phone: [null, [Validators.required, Validators.pattern('[0-9]{9}')]],
        username: [null, [Validators.required]]
      },
      {
        validators: RepeatPasswordValidator
      }
    );
  }
}
