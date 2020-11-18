import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UsersState } from 'src/app/core/state/reducers/users.reducer';
import { Observable } from 'rxjs';
import { User } from 'src/app/modules/auth/models/user.model';
import { usersInformation } from 'src/app/core/state/selectors/users.selectors';
import { UsersActions } from 'src/app/core/state/actions/users.actions';
import {
  findedUsers,
  windowWidth
} from 'src/app/core/state/selectors/shared.selectors';
import { SharedState } from 'src/app/core/state/reducers/shared.reducer';
import { SharedActions } from 'src/app/core/state/actions/shared.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  public users$: Observable<User[]> = this.store$.pipe(
    select(usersInformation)
  );

  public foundUsers$: Observable<User[]> = this.sharedStore$.pipe(
    select(findedUsers)
  );

  public searchWindow: boolean = false;

  public windowWidth$: Observable<boolean> = this.sharedStore$.pipe(
    select(windowWidth)
  );

  public searchForm: FormGroup;

  public displayedColumns: string[] = [
    'username',
    'email',
    'phone',
    'creation_dt',
    'actionDelete'
  ];

  constructor(
    private store$: Store<UsersState>,
    private sharedStore$: Store<SharedState>,
    private fb: FormBuilder
  ) {}

  public search(): void {
    const { searchValue } = this.searchForm.value;

    this.store$.dispatch(
      SharedActions.searchUserAction({ searchValue: +searchValue })
    );

    this.foundUsers$.subscribe((res: User[]) =>
      res ? '' : alert('Пользователи не найдены')
    );
  }

  public openSearchWindow(): void {
    this.searchWindow = !this.searchWindow;
  }

  public ngOnInit(): void {
    this.store$.dispatch(UsersActions.getUsersAction());

    this.searchForm = this.fb.group({
      searchValue: [null, [Validators.required, Validators.pattern('[0-9]{9}')]]
    });
  }
}
