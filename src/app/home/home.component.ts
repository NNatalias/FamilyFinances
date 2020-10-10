import {Component, OnInit} from '@angular/core';
import {Purchase} from '../Interfaces/Purchase';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../Interfaces/category';
import {NewPurchaseService} from '../services/newPurchase.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../services/auth.service';
import {AllPurchaseService} from '../services/allPurchase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private newPurchaseRegistrationService: NewPurchaseService,
              private snackBar: MatSnackBar,
              private auth: AuthService,
              private allPurchaseService: AllPurchaseService) {
  }

  form: FormGroup;
  categories: Category[] = [
    {value: 'Продукты'},
    {value: 'Алкоголь'},
    {value: 'Одежда'}
  ];

  ngOnInit(): void {
    this.form = new FormGroup({
      nameShop: new FormControl(null, Validators.max(20)),
      sumItem: new FormControl(null, Validators.required),
      newCategory: new FormControl(null, Validators.max(20)),
      currentCategory: new FormControl('', Validators.required),
      newProducts: new FormArray([])
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    const registration: Purchase =
      {
        owner: this.auth.userId,
        nameOfShop: this.form.value.nameShop,
        sum: this.form.value.sumItem,
        category: this.form.value.currentCategory.value,
        products: this.form.value.newProducts,
        date: new Date(),
      };
    this.newPurchaseRegistrationService.create(registration).subscribe(() => {
      this.form.reset();
      this.openSnackBar('Новая запись успешно добавлена');
      this.allPurchaseService.getAll().subscribe((purchases: any) =>
        this.allPurchaseService.purchases = purchases
      );
    }, error => {
      this.form.reset();
      this.openSnackBar('Ошибка сервера!');
    });
  }

  addNewCategory(): void {
    const newCategory = this.form.get('newCategory').value;
    this.categories.push({value: newCategory});
    this.form.get('newCategory').reset();
    this.openSnackBar('Новая категория успешно добавлена');
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  addProduct(): void {
    const control = new FormControl('', Validators.required);
    (this.form.controls.newProducts as FormArray).push(control);
  }
}

