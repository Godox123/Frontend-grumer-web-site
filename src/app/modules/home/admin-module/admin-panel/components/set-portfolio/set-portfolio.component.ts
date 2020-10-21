import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PortfolioActions } from 'src/app/core/state/actions/portfolio.actions';
import { PortfolioState } from 'src/app/core/state/reducers/portfolio.reducer';
import { portfolio } from 'src/app/core/state/selectors/portfolio.selectors';
import { Portfolio } from 'src/app/modules/home/models/portfolio.model';
import { DeletePortfolioComponent } from './components/delete-portfolio/delete-portfolio.component';
import { AddPortfolioComponent } from './components/set-portfolio/add-portfolio.component';
import { UpdatePortfolioComponent } from './components/update-portfolio/update-portfolio.component';

@Component({
  selector: 'app-set-portfolio',
  templateUrl: './set-portfolio.component.html',
  styleUrls: ['./set-portfolio.component.scss']
})
export class SetPortfolioComponent implements OnInit {
  public portfolio$: Observable<Portfolio[]> = this.storePortfolio$.pipe(
    select(portfolio)
  );

  constructor(
    private storePortfolio$: Store<PortfolioState>,
    public dialog: MatDialog
  ) {}

  public openAddPortfolioDialog(): void {
    const dialogRef = this.dialog.open(AddPortfolioComponent);
  }

  public openDeleteDialog(id: string): void {
    this.dialog.open(DeletePortfolioComponent, {
      data: {
        portfolioId: id
      }
    });
  }

  public openUpdateDialog(
    _id: string,
    description: string,
    photoUrlBefore: File,
    photoUrlAfter: File
  ): void {
    const dialogRef = this.dialog.open(UpdatePortfolioComponent, {
      data: {
        portfolioId: _id,
        description,
        photoUrlBefore,
        photoUrlAfter
      }
    });
  }

  public ngOnInit(): void {
    this.storePortfolio$.dispatch(PortfolioActions.getPortfolioAction());
    this.portfolio$.subscribe(res => console.log(res));
  }
}
