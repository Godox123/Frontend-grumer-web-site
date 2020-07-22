import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UserState } from 'src/app/core/state/reducers/auth.reducer';
import { authActions } from 'src/app/core/state/actions/auth.actions';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationComponent } from '../registration/registration.component';
import { Observable } from 'rxjs';
import { loginFailed } from 'src/app/core/state/selectors/user.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  public hide: boolean = true;

  public errMsg: Observable<string> = this.store$.pipe(select(loginFailed));

  constructor(
    private fb: FormBuilder,
    private store$: Store<UserState>,
    public dialog: MatDialog
  ) {}

  public openDialog(): void {
    this.dialog.open(RegistrationComponent);
  }

  public login(): void {
    const {
      email,
      password
    }: { email: string; password: string } = this.loginForm.value;
    return this.store$.dispatch(authActions.loginAction({ email, password }));
  }

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }
}
