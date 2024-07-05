import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  categoryAddForm: FormGroup;
  arrCategory: Category[] = [];
  tempId: number = 0;
  constructor(fb: FormBuilder, private categoryService: CategoryService) {
    this.categoryAddForm = fb.group({
      'categoryName': ['', Validators.required],
      'categoryDescription': ['', Validators.required],
    });
    this.categoryService.getCategory().subscribe((data) => {
      this.arrCategory = data;
    });
  }

  get f() { return this.categoryAddForm.controls; }

  onSubmit(frmValue: any): void {
    if (!this.categoryAddForm.valid) {
      console.log("Not Valid");
      return;
    }
    if (this.arrCategory.length == 0) {
      this.tempId = 1;
    }
    else {
      this.tempId = Number(this.arrCategory[this.arrCategory.length - 1].id) + 1;
    }
    var newCategory = new Category(
      this.tempId,frmValue['categoryName'],
      frmValue['categoryDescription']
    );
    this.categoryService.addCategory(newCategory).subscribe();
  }
}