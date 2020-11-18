import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SharedState } from 'src/app/core/state/reducers/shared.reducer';
import { SharedActions } from 'src/app/core/state/actions/shared.actions';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss']
})
export class LeftBarComponent implements OnInit {
  constructor(private store$: Store<SharedState>) {}

  public closeMenu(): void {
    this.store$.dispatch(SharedActions.showMenuAction());
  }

  public ngOnInit(): void {}
}
