import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SharedActions } from 'src/app/core/state/actions/shared.actions';
import { SharedState } from 'src/app/core/state/reducers/shared.reducer';
import { windowWidth } from 'src/app/core/state/selectors/shared.selectors';

@Component({
  selector: 'admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  private windowWidth$: Observable<boolean> = this.store$.pipe(
    select(windowWidth)
  );

  constructor(private store$: Store<SharedState>) {}

  public showMenu(): void {
    this.store$.dispatch(SharedActions.showMenuAction());
  }

  public ngOnInit(): void {}
}
