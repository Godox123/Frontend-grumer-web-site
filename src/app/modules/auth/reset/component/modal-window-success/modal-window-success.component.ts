import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UserState } from 'src/app/core/state/reducers/auth.reducer';
import { resetMessageSuccess } from 'src/app/core/state/selectors/user.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-window-success',
  templateUrl: './modal-window-success.component.html',
  styleUrls: ['./modal-window-success.component.scss']
})
export class ModalWindowSuccessComponent implements OnInit {
  public successMsg: Observable<string> = this.store$.pipe(
    select(resetMessageSuccess)
  );

  constructor(private store$: Store<UserState>) {}

  public ngOnInit(): void {}
}
