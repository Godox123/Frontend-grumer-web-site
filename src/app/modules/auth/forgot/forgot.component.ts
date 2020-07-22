import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { UserState } from 'src/app/core/state/reducers/auth.reducer';
import { authActions } from 'src/app/core/state/actions/auth.actions';
import { Observable } from 'rxjs';
import {
  forgotFailed,
  forgotMessageSuccess
} from 'src/app/core/state/selectors/user.selectors';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotComponent implements OnInit {
  constructor(private store$: Store<UserState>, private fb: FormBuilder) {}

  public errMsg: Observable<string> = this.store$.pipe(select(forgotFailed));

  public successMessage: Observable<string> = this.store$.pipe(
    select(forgotMessageSuccess)
  );

  public forgotForm: FormGroup;

  public forgot(): any {
    const { email }: { email: string } = this.forgotForm.value;
    return this.store$.dispatch(authActions.forgotAction({ email }));
  }

  public ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }
}
