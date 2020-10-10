import {Component, OnDestroy, OnInit} from '@angular/core';
import {AllPurchaseService} from '../services/allPurchase.service';
import {Subscription} from 'rxjs';
import {SnackBarService} from '../services/snackBar.service';

@Component({
  selector: 'app-last-purchase-table',
  templateUrl: './last-purchase-table.component.html',
  styleUrls: ['./last-purchase-table.component.css'],
})
export class LastPurchaseTableComponent implements OnInit, OnDestroy {
  pSub: Subscription;
  dSub: Subscription;
  searchStr = '';
  searchDate = '';
  constructor( public allPurchaseService: AllPurchaseService, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.pSub = this.allPurchaseService.getAll().subscribe(purchases => {
      this.allPurchaseService.purchases = purchases.sort((d1, d2) => new Date(d2.date).getTime() - new Date(d1.date).getTime());
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
  this.allPurchaseService.purchases = this.allPurchaseService.purchases.filter(purchase => purchase.id !== id);
  this.snackBarService.openSnackBar('Запись о покупке успешно удалена!');
});
  }
}
