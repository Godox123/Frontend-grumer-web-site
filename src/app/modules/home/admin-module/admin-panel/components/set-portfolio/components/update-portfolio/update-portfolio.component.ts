import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { PortfolioActions } from 'src/app/core/state/actions/portfolio.actions';
import { PortfolioState } from 'src/app/core/state/reducers/portfolio.reducer';
import { ConfirmationMessageComponent } from '../confirmation-message/confirmation-message.component';

@Component({
  selector: 'app-update-portfolio',
  templateUrl: './update-portfolio.component.html',
  styleUrls: ['./update-portfolio.component.scss']
})
export class UpdatePortfolioComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      portfolioId: string;
      description: string;
      photoUrlBefore: File;
      photoUrlAfter: File;
    },
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdatePortfolioComponent>,
    public dialog: MatDialog,
    private storePortfolio$: Store<PortfolioState>
  ) {}

  public updatePortfolioForm: FormGroup;

  public imgSrcBefore: string;
  public imgSrcAfter: string;

  private fileToUpload: File = null;

  public openDialog(): void {
    this.dialog.open(ConfirmationMessageComponent);
  }

  public selectImg(className: string, file: File): void {
    let reader = new FileReader();
    if (className === 'before') {
      this.updatePortfolioForm.patchValue({
        photoUrlBefore: file[0]
      });
      this.updatePortfolioForm.get('photoUrlBefore').updateValueAndValidity();
      reader.onload = (event: any): void => {
        this.imgSrcBefore = event.target.result;
      };
    } else if (className === 'after') {
      this.updatePortfolioForm.patchValue({
        photoUrlAfter: file[0]
      });
      this.updatePortfolioForm.get('photoUrlAfter').updateValueAndValidity();
      reader.onload = (event: any): void => {
        this.imgSrcAfter = event.target.result;
      };
    }
    this.fileToUpload = file[0];

    reader.readAsDataURL(this.fileToUpload);
  }

  public updatePortfolio(): void {
    let {
      description,
      photoUrlBefore,
      photoUrlAfter
    } = this.updatePortfolioForm.value;
    const id = this.data.portfolioId;
    console.log(id);
    this.storePortfolio$.dispatch(
      PortfolioActions.updatePortfolioAction({
        id,
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
    console.log(this.data.portfolioId);
    this.updatePortfolioForm = this.fb.group({
      description: [this.data.description, [Validators.required]],
      photoUrlBefore: [this.data.photoUrlBefore],
      photoUrlAfter: [this.data.photoUrlAfter]
    });
  }
}
