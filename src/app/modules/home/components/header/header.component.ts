import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UserState } from 'src/app/core/state/reducers/auth.reducer';
import { Observable } from 'rxjs';
import { User } from 'src/app/modules/auth/models/user.model';
import { userInformation } from 'src/app/core/state/selectors/user.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public user$: Observable<User> = this.store$.pipe(select(userInformation));

  constructor(private store$: Store<UserState>) {}
  public ngOnInit(): void {}
}
