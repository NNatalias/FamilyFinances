import {Component, OnDestroy, OnInit} from '@angular/core';
import {AllPurchaseService} from '../services/allPurchase.service';
import {Purchase} from '../Interfaces/Purchase';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../services/auth.service';

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
  constructor(public allPurchaseService: AllPurchaseService,
              private snackBar: MatSnackBar,
              ) { }

  ngOnInit(): void {
    this.pSub = this.allPurchaseService.getAll().subscribe(purchases => {
     this.allPurchaseService.purchases = purchases;
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
  this.openSnackBar('Запись о покупке успешно удалена!');
});
  }
  openSnackBar(message: string): void{
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
