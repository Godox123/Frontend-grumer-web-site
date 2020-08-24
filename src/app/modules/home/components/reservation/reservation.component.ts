import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ServicesState } from 'src/app/core/state/reducers/services.reducer';
import { Store, select } from '@ngrx/store';
import { ServicesActions } from 'src/app/core/state/actions/services.actions';
import { Observable } from 'rxjs';
import { Service } from '../../models/service.model';
import { services } from 'src/app/core/state/selectors/services.selectors';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesComponent implements OnInit {
  public services$: Observable<Service[]> = this.store$.pipe(select(services));

  constructor(private store$: Store<ServicesState>) {}

  public ngOnInit(): void {
    this.store$.dispatch(ServicesActions.getServicesAction());
  }
}
