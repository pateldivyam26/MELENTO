import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss'
})
export class UpdateCategoryComponent {
  categoryAddForm: FormGroup;
  arrCategory :Category[] = [];
  category = new Category(0,"","")
  idUpdated: number = 0;
  constructor(fb: FormBuilder, private categoryService: CategoryService) {
    this.categoryService.getCategory().subscribe(data=>{
      this.arrCategory=data
    })
    this.categoryAddForm = fb.group({
      'categoryName': ['', Validators.required],
      'categoryDescription' : ['', Validators.required],
    });
  }

  get f() { return this.categoryAddForm.controls; }
  onChangeType(evt: any) {
    var idObtained = evt.target.value;
    this.idUpdated = parseInt(idObtained.split(':')[1].trim());
    
    for (var i = 0; i < this.arrCategory.length; i++) {
      if (this.idUpdated == this.arrCategory[i].id) {
        this.category = this.arrCategory[i];
      }
    }
    this.categoryAddForm.get('categoryName')?.setValue(this.category.categoryName.toString());
    this.categoryAddForm.get('categoryDescription')?.setValue(this.category.categoryDescription.toString());
  }

  onSubmit(frmValue: any): void {
    if (!this.categoryAddForm.valid) {
      console.log("Not Valid");
      return;
    }
    this.category.categoryName = frmValue['categoryName'];
    this.category.categoryDescription=frmValue['categoryDescription'];
    this.categoryService.updateCategory(this.category).subscribe();
  }
}
