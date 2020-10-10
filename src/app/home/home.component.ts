import {Component, OnInit, ViewChild} from '@angular/core';
import {Purchase} from '../Interfaces/Purchase';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../Interfaces/category';
import {NewPurchaseService} from '../services/newPurchase.service';
import {AuthService} from '../services/auth.service';
import {SnackBarService} from '../services/snackBar.service';
import {AllPurchaseService} from '../services/allPurchase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('f') MyNgForm;
  constructor(private newPurchaseRegistrationService: NewPurchaseService,
              private allPurchaseService: AllPurchaseService,
              private snackBarService: SnackBarService,
              private auth: AuthService) {
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
      this.MyNgForm.resetForm();
      this.snackBarService.openSnackBar('Новая запись успешно добавлена');
      this.allPurchaseService.getAll().subscribe(purchase => {
        this.allPurchaseService.purchases = purchase.sort((d1, d2) => new Date(d2.date).getTime() - new Date(d1.date).getTime());
      });
    }, error => {
      console.log(error);
      this.form.reset();
      this.snackBarService.openSnackBar('Ошибка сервера!');
    });
  }

  addNewCategory(): void {
    const newCategory = this.form.get('newCategory').value;
    this.categories.push({value: newCategory});
    this.form.get('newCategory').reset();
    this.snackBarService.openSnackBar('Новая категория успешно добавлена');
  }

  addProduct(): void {
    const control = new FormControl('', Validators.required);
    (this.form.controls.newProducts as FormArray).push(control);
  }
}

