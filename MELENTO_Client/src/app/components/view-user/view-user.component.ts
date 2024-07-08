import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss'
})
export class ViewUserComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'dob', 'mobileNo', 'address', 'role'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.dataSource.data = data;
    });
  }



  // arrUsers:User[]=[]
  // constructor(private userService:UserService){
  //   this.userService.getUsers().subscribe(data=>{
  //     this.arrUsers=data
  //   })
  // }
}
