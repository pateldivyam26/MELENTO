import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

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
  constructor(fb: FormBuilder, private categoryService: CategoryService, private _snackBar: MatSnackBar) {
    this.categoryService.getCategory().subscribe(data=>{
      this.arrCategory=data
    })
    this.categoryAddForm = fb.group({
      'categoryName': ['', Validators.required],
      'categoryDescription' : ['', Validators.required],
    });
  }

  get f() { return this.categoryAddForm.controls; }

  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 2000;
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';

    this._snackBar.open(message, action, config);
  }

  showMessage() {
    this.openSnackBar('Category Updated Successfully!!', 'Close');
  }
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
    this.showMessage();
  }
}
