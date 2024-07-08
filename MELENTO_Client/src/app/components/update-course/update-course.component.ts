import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CourseService } from '../../services/course.service'; 
import { Course } from '../../models/course';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrl: './update-course.component.scss'
})
export class UpdateCourseComponent {
  courseAddForm: FormGroup;
  arrCourse :Course[] = [];
  arrCategory: Category[] = [];
  course = new Course(0,"","",0)
  idUpdated: number = 0;
  constructor(fb: FormBuilder, private courseService: CourseService, private categoryService:CategoryService, private _snackBar: MatSnackBar) {
    this.courseService.getCourses().subscribe(data=>{
      this.arrCourse=data
    })
    this.categoryService.getCategory().subscribe((data) => {
      this.arrCategory = data;
    });
    this.courseAddForm = fb.group({
      'id':['',Validators.required],
      'cName' : ['', Validators.required],
      'cDescription' : ['', Validators.required],
      'categoryId' : ['', Validators.required],
    });
  }

  get f() { return this.courseAddForm.controls; }

  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 2000;
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';

    this._snackBar.open(message, action, config);
  }

  showMessage(message: string) {
    this.openSnackBar(message, 'Close');
  }

  onChangeType(evt: any) {
    var idObtained = evt.target.value;
    this.idUpdated = parseInt(idObtained.split(':')[1].trim());
    
    for (var i = 0; i < this.arrCourse.length; i++) {
      if (this.idUpdated == this.arrCourse[i].id) {
        this.course = this.arrCourse[i];
      }
    }
    this.courseAddForm.get('cName')?.setValue(this.course.cName.toString());
    this.courseAddForm.get('cDescription')?.setValue(this.course.cDescription.toString());
    this.courseAddForm.get('categoryId')?.setValue(this.course.categoryId.toString());
  }

  onSubmit(frmValue: any): void {
    if (!this.courseAddForm.valid) {
      console.log("Not Valid");
      return;
    }

    // console.log('submitted value: ', frmValue);
    this.course.cName=frmValue['cName'];
    this.course.cDescription=frmValue['cDescription'];
    this.course.categoryId=frmValue['categoryId'];
    this.courseService.updateCourse(this.course).subscribe();
    this.showMessage('Course Updated Successfully!!');
    // const newCourse = new Course(
    //   0, // Assuming auto-generated ID
    //   frmValue['cName'],
    //   frmValue['cDescription'],
    //   frmValue['categoryId']
    // );
  }
}
