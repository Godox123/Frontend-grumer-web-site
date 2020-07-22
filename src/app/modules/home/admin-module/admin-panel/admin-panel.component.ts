import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/core/state/reducers/auth.reducer';
import { authActions } from 'src/app/core/state/actions/auth.actions';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  constructor(private store$: Store<UserState>) {}

  public ngOnInit(): void {
    this.store$.dispatch(authActions.getUserAction());
  }
}
