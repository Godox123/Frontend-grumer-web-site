import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { UserState } from 'src/app/core/state/reducers/auth.reducer';
import { authActions } from 'src/app/core/state/actions/auth.actions';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {
  resetFailed,
  resetMessageSuccess
} from 'src/app/core/state/selectors/user.selectors';
import {
  RepeatPasswordValidator,
  RepeatPasswordEStateMatcher
} from '../validators/confirmed-password.validator';
import { MatDialog } from '@angular/material';
import { ModalWindowSuccessComponent } from './component/modal-window-success/modal-window-success.component';
import { ModalWindowFailedComponent } from './component/modal-window-failed/modal-window-failed.component';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetComponent implements OnInit {
  public hidePassword: boolean = true;
  public hideConfirmPassword: boolean = true;

  public resetForm: FormGroup;

  public passwordsMatcher: RepeatPasswordEStateMatcher = new RepeatPasswordEStateMatcher();

  public errMsg: Observable<string> = this.store$.pipe(select(resetFailed));

  public successMsg: Observable<string> = this.store$.pipe(
    select(resetMessageSuccess)
  );

  constructor(
    private store$: Store<UserState>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  public openSuccessDialog(): void {
    this.dialog.open(ModalWindowSuccessComponent);
  }

  public openFailedDialog(): void {
    this.dialog.open(ModalWindowFailedComponent);
  }

  public reset(): void {
    const { password }: { password: string } = this.resetForm.value;
    this.store$.dispatch(authActions.resetAction({ password }));
    this.openDialog();
  }

  public ngOnInit(): void {
    let token: string;
    this.route.params.subscribe(params => (token = params.token));
    this.store$.dispatch(authActions.getResetTokenAction({ token }));
    this.resetForm = this.fb.group(
      {
        password: [null, [Validators.required, Validators.minLength(6)]],
        passwordAgain: [null]
      },
      {
        validators: RepeatPasswordValidator
      }
    );
  }
  private openDialog(): void {
    this.errMsg.subscribe(err => {
      if (err !== null) {
        return this.openFailedDialog();
      }
    });
    this.successMsg.subscribe(success => {
      if (success !== null) {
        return this.openSuccessDialog();
      }
    });
  }
}
