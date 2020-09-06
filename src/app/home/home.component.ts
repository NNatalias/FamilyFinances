import { Component, OnInit } from '@angular/core';
import {Registration} from '../Interfaces/registration';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../Interfaces/category';
import {NewPurchaseService} from '../services/newPurchase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor( private newPurchaseRegistrationService: NewPurchaseService) { }

  form: FormGroup;
  categories: Category[] = [
    {value: 'Продукты'},
    {value: 'Алкоголь'},
    {value: 'Одежда'}
  ];

  ngOnInit(): void {
    this.form = new FormGroup({
      nameShop: new FormControl(null, Validators.max(15)),
      sumItem: new FormControl(null, Validators.required),
      currentCategory: new FormControl('', Validators.required)
    });
  }

  submit(){
    if ( this.form.invalid){
      return;
    }
    const registration: Registration =
     {
       nameOfShop: this.form.value.nameShop,
       sum: this.form.value.sumItem,
       category: this.form.value.currentCategory.value,
       date: new Date(),
     };
    this.newPurchaseRegistrationService.create(registration).subscribe(() => {
      this.form.reset();
    });
  }


}
