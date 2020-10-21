import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { PortfolioActions } from 'src/app/core/state/actions/portfolio.actions';
import { PortfolioState } from 'src/app/core/state/reducers/portfolio.reducer';
import { ConfirmationMessageComponent } from '../confirmation-message/confirmation-message.component';

@Component({
  selector: 'app-delete-portfolio',
  templateUrl: './delete-portfolio.component.html',
  styleUrls: ['./delete-portfolio.component.scss']
})
export class DeletePortfolioComponent implements OnInit {
  constructor(
    private portfolioStore$: Store<PortfolioState>,
    public dialogRef: MatDialogRef<DeletePortfolioComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      portfolioId: string;
    }
  ) {}

  public openDialog(): void {
    this.dialog.open(ConfirmationMessageComponent);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public removeService(): void {
    const id = this.data.portfolioId;
    this.portfolioStore$.dispatch(
      PortfolioActions.deletePortfolioAction({ id })
    );
    this.openDialog();
  }

  public ngOnInit(): void {
    console.log(this.data.portfolioId);
  }
}
