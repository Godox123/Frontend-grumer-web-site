import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SharedActions } from 'src/app/core/state/actions/shared.actions';
import { SharedState } from 'src/app/core/state/reducers/shared.reducer';

@Component({
  selector: 'admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  constructor(private store$: Store<SharedState>) {}

  public showMenu(): void {
    console.log('show Menu True');
    this.store$.dispatch(SharedActions.showMenuAction());
  }

  public ngOnInit(): void {}
}
