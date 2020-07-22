import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UserState } from 'src/app/core/state/reducers/auth.reducer';
import { Observable } from 'rxjs';
import { resetFailed } from 'src/app/core/state/selectors/user.selectors';

@Component({
  selector: 'app-modal-window-failed',
  templateUrl: './modal-window-failed.component.html',
  styleUrls: ['./modal-window-failed.component.scss']
})
export class ModalWindowFailedComponent {
  public errMsg: Observable<string> = this.store$.pipe(select(resetFailed));

  constructor(private store$: Store<UserState>) {}
}
