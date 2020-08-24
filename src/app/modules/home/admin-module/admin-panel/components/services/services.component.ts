import { Component, OnInit } from '@angular/core';
import { ServicesActions } from 'src/app/core/state/actions/services.actions';
import { Store, select } from '@ngrx/store';
import { ServicesState } from 'src/app/core/state/reducers/services.reducer';
import { services } from 'src/app/core/state/selectors/services.selectors';
import { Service } from 'src/app/modules/home/models/service.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  public services$: Observable<Service[]> = this.storeServices$.pipe(
    select(services)
  );

  constructor(private storeServices$: Store<ServicesState>) {}

  public ngOnInit(): void {
    this.storeServices$.dispatch(ServicesActions.getServicesAction());
    this.services$.subscribe(res => console.log(res));
  }
}
