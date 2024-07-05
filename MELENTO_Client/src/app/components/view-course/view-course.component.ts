import { Component } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrl: './view-course.component.scss'
})
export class ViewCourseComponent {
  arrCourse:Course[]=[]
  arrCategory: Category[] = [];
  categoryMap: { [id: number]: string } = {};
  constructor(private courseService:CourseService, private categoryService: CategoryService){
    this.courseService.getCourses().subscribe(data=>{
      this.arrCourse=data
    })
    this.categoryService.getCategory().subscribe((data) => {
      this.arrCategory = data;
      this.arrCategory.forEach(category => {
        this.categoryMap[category.id] = category.categoryName;
      });
    });
  }
}
