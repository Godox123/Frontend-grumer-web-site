import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SharedActions } from 'src/app/core/state/actions/shared.actions';
import { SharedState } from 'src/app/core/state/reducers/shared.reducer';
import {
  menuState,
  windowWidth
} from 'src/app/core/state/selectors/shared.selectors';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPanelComponent implements OnInit {
  public showState$: Observable<boolean> = this.store$.pipe(select(menuState));

  public windowWidth$: Observable<boolean> = this.store$.pipe(
    select(windowWidth)
  );

  constructor(private store$: Store<SharedState>) {}

  public ngOnInit(): void {
    this.store$.dispatch(SharedActions.checkWidthWindowAction());
  }
}
