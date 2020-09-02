import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ServicesActions } from 'src/app/core/state/actions/services.actions';
import { Store, select } from '@ngrx/store';
import { ServicesState } from 'src/app/core/state/reducers/services.reducer';
import { services } from 'src/app/core/state/selectors/services.selectors';
import { Service } from 'src/app/modules/home/models/service.model';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { DeleteServiceComponent } from './components/delete-service/delete-service.component';
import { UpdateServiceComponent } from './components/update-service/update-service.component';
import { AddServiceComponent } from './components/add-service/add-service.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesComponent implements OnInit {
  public services$: Observable<Service[]> = this.storeServices$.pipe(
    select(services)
  );

  constructor(
    private storeServices$: Store<ServicesState>,
    public dialog: MatDialog
  ) {}

  public openAddReservationDialog(): void {
    const dialogRef = this.dialog.open(AddServiceComponent);
  }

  public openDeleteDialog(id: string): void {
    console.log(id);
    this.dialog.open(DeleteServiceComponent, {
      data: {
        userId: id
      }
    });
  }

  public openUpdateDialog(id: string, service: string): void {
    const dialogRef = this.dialog.open(UpdateServiceComponent, {
      data: {
        userId: id
      }
    });
  }

  public ngOnInit(): void {
    this.storeServices$.dispatch(ServicesActions.getServicesAction());
    this.services$.subscribe(res => console.log(res));
  }
}
