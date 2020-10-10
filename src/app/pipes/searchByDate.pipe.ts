import {Pipe, PipeTransform} from '@angular/core';
import {Purchase} from '../Interfaces/Purchase';

@Pipe({
  name: 'searchByDate'
})
export class SearchByDatePipe implements PipeTransform{
  transform(registrationPurchases: Purchase[], search = ''): Purchase[] {
    if (!search){
      return registrationPurchases;
    }
    else {
      return registrationPurchases.filter( purchase => {
        purchase.date.setHours(0, 0, 0, 0);
        return purchase.date.toString().includes(search);
        }
      );
    }
  }

}
