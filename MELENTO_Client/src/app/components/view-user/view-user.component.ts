import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss'
})
export class ViewUserComponent {
  arrUsers:User[]=[]
  constructor(private userService:UserService){
    this.userService.getUsers().subscribe(data=>{
      this.arrUsers=data
    })
  }
}