import {Component, OnDestroy, OnInit} from '@angular/core';
import {AllPurchaseService} from '../services/allPurchase.service';
import {Purchase} from '../Interfaces/Purchase';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-last-purchase-table',
  templateUrl: './last-purchase-table.component.html',
  styleUrls: ['./last-purchase-table.component.css']
})
export class LastPurchaseTableComponent implements OnInit, OnDestroy {

  purchases: Purchase[] = [];
  pSub: Subscription;
  dSub: Subscription;
  searchStr = '';
  constructor(private allPurchaseService: AllPurchaseService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.pSub = this.allPurchaseService.getAll().subscribe(purchases => {
     this.purchases = purchases;
    });
  }
  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
}
  removePurchase(id: string): void  {
this.allPurchaseService.remove(id).subscribe(() => {
  this.purchases = this.purchases.filter(purchase => purchase.id !== id);
  this.openSnackBar('Запись о покупке успешно удалена!');
});
  }
  openSnackBar(message: string): void{
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
