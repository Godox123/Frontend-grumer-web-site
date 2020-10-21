import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PortfolioState } from 'src/app/core/state/reducers/portfolio.reducer';
import {
  errMessage,
  successMessage
} from 'src/app/core/state/selectors/portfolio.selectors';

@Component({
  selector: 'app-confirmation-message',
  templateUrl: './confirmation-message.component.html',
  styleUrls: ['./confirmation-message.component.scss']
})
export class ConfirmationMessageComponent implements OnInit {
  public portfolioSuccessMessage$: Observable<
    string
  > = this.storePortfolio$.pipe(select(successMessage));

  public portfolioFailedMessage$: Observable<Error> = this.storePortfolio$.pipe(
    select(errMessage)
  );

  constructor(
    public dialogRef: MatDialogRef<ConfirmationMessageComponent>,
    private storePortfolio$: Store<PortfolioState>
  ) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public ngOnInit(): void {}
}
