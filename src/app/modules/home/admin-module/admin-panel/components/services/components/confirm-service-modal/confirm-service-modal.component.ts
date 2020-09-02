import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ServicesState } from 'src/app/core/state/reducers/services.reducer';
import {
  successMessage,
  errMessage
} from 'src/app/core/state/selectors/services.selectors';

@Component({
  selector: 'app-confirm-service-modal',
  templateUrl: './confirm-service-modal.component.html',
  styleUrls: ['./confirm-service-modal.component.scss']
})
export class ConfirmServiceModalComponent {
  public successMessage$: Observable<string> = this.store$.pipe(
    select(successMessage)
  );

  public failedMessage$: Observable<Error> = this.store$.pipe(
    select(errMessage)
  );
  constructor(private store$: Store<ServicesState>) {}
}
