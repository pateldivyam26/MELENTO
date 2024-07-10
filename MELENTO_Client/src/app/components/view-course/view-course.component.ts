import { Component, ViewChild } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrl: './view-course.component.scss'
})
export class ViewCourseComponent {
  displayedColumns: string[] = ['id', 'cName', 'cDescription', 'category'];
  dataSource = new MatTableDataSource<Course>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  categoryMap: { [id: number]: string } = {};

  constructor(private courseService: CourseService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCourses();
    this.loadCategories();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe((data: Course[]) => {
      this.dataSource.data = data.map(course => ({
        ...course,
        category: this.categoryMap[course.categoryId] || 'Unknown'
      }));
    });
  }

  loadCategories(): void {
    this.categoryService.getCategory().subscribe((data: Category[]) => {
      this.categoryMap = data.reduce((map, category) => {
        map[category.id] = category.categoryName;
        return map;
      }, {} as { [id: number]: string });
    });
  }
}
