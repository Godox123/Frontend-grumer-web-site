import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { PortfolioActions } from 'src/app/core/state/actions/portfolio.actions';
import { PortfolioState } from 'src/app/core/state/reducers/portfolio.reducer';
import { ConfirmationMessageComponent } from '../confirmation-message/confirmation-message.component';

@Component({
  selector: 'app-add-portfolio',
  templateUrl: './add-portfolio.component.html',
  styleUrls: ['./add-portfolio.component.scss']
})
export class AddPortfolioComponent implements OnInit {
  public setPortfolioForm: FormGroup;

  public imgSrcBefore: string;
  public imgSrcAfter: string;

  private fileToUpload: File = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddPortfolioComponent>,
    public dialog: MatDialog,
    private storePortfolio$: Store<PortfolioState>
  ) {}

  public openDialog(): void {
    this.dialog.open(ConfirmationMessageComponent);
  }

  public selectImg(className: string, file: File): void {
    let reader = new FileReader();
    if (className === 'before') {
      this.setPortfolioForm.patchValue({
        photoUrlBefore: file[0]
      });
      this.setPortfolioForm.get('photoUrlBefore').updateValueAndValidity();
      reader.onload = (event: any): void => {
        this.imgSrcBefore = event.target.result;
      };
    } else if (className === 'after') {
      this.setPortfolioForm.patchValue({
        photoUrlAfter: file[0]
      });
      this.setPortfolioForm.get('photoUrlAfter').updateValueAndValidity();
      reader.onload = (event: any): void => {
        this.imgSrcAfter = event.target.result;
      };
    }
    this.fileToUpload = file[0];

    reader.readAsDataURL(this.fileToUpload);
  }

  public setPortfolio(): void {
    let {
      description,
      photoUrlBefore,
      photoUrlAfter
    } = this.setPortfolioForm.value;
    this.storePortfolio$.dispatch(
      PortfolioActions.setPortfolioAction({
        photoUrlBefore,
        photoUrlAfter,
        description
      })
    );
    this.openDialog();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public ngOnInit(): void {
    this.setPortfolioForm = this.fb.group({
      description: [null, [Validators.required]],
      photoUrlBefore: [null],
      photoUrlAfter: [null]
    });
  }
}
