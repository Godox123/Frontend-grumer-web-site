import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SharedState } from 'src/app/core/state/reducers/shared.reducer';
import { menuState } from 'src/app/core/state/selectors/shared.selectors';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss']
})
export class LeftBarComponent implements OnInit {
  public showState$: Observable<boolean> = this.store$.pipe(select(menuState));

  constructor(private store$: Store<SharedState>) {}

  public ngOnInit(): void {
    this.showState$.subscribe(res => console.log(res));
  }
}
