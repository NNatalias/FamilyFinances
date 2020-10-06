import {Pipe, PipeTransform} from '@angular/core';
import {Purchase} from '../Interfaces/Purchase';

@Pipe({
  name: 'searchByCategory'
})
export class SearchPipe implements PipeTransform{
  transform(registrationPurchases: Purchase[], search = ''): Purchase[] {
    if (!search.trim()){
return registrationPurchases;
    }
    else {
      return registrationPurchases.filter( purchase => {
        return purchase.category.toLowerCase().includes(search.toLowerCase());
        }
      );
    }
  }

}
