import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Attendance } from '../../models/attendance';
import { AttendanceService } from '../../services/attendance.service';
import { MatSort } from '@angular/material/sort';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.scss']
})
export class ViewAttendanceComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'assessmentId', 'traineeId', 'dateTaken', 'actions'];
  dataSource = new MatTableDataSource<Attendance>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private attendanceService: AttendanceService,private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadAttendance();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  loadAttendance(): void {
    this.attendanceService.getAttendance().subscribe((data: Attendance[]) => {
      this.dataSource.data = data;
    });
  }

  deleteAttendance(id: number): void {
    this.attendanceService.deleteAttendance(id).subscribe(() => {
      this.loadAttendance();
    });
    this._snackBar.open('Attendance deleted successfully', 'Close', {
      duration: 2000,
    });

  }
}
