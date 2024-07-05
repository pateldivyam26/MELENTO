import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent {
  courseAddForm: FormGroup;
  arrCourse: Course[] = [];
  arrCategory: Category[] = [];
  tempId: number = 0;
  constructor(fb: FormBuilder, private courseService: CourseService, private categoryService:CategoryService) {
    this.courseAddForm = fb.group({
      'cName': ['', Validators.required],
      'cDescription': ['', Validators.required],
      'categoryId': ['', Validators.required],
    });
    this.courseService.getCourses().subscribe((data) => {
      this.arrCourse = data;
    });
    this.categoryService.getCategory().subscribe((data) => {
      this.arrCategory = data;
    });
  }

  get f() { return this.courseAddForm.controls; }

  onSubmit(frmValue: any): void {
    if (!this.courseAddForm.valid) {
      console.log("Not Valid");
      return;
    }
    if (this.arrCourse.length == 0) {
      this.tempId = 1;
    }
    else {
      this.tempId = Number(this.arrCourse[this.arrCourse.length - 1].id) + 1;
    }
    const newCourse = new Course(
      this.tempId,
      frmValue['cName'],
      frmValue['cDescription'],
      frmValue['categoryId']
    );
    this.courseService.addCourse(newCourse).subscribe();
  }
}
