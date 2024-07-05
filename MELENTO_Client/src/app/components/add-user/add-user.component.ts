import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Address } from '../../models/address';
import { User } from '../../models/user';
import { Faculty } from '../../models/faculty';
import { FacultyService } from '../../services/faculty.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  userAddForm: FormGroup;
  tempId:number=0;
  arrUsers :User[] = [];
  arrFaculty: Faculty[] = [];
  tempFId: number = 0;
  maxDate: string="";
  constructor(fb: FormBuilder, private userService:UserService, private facultyService: FacultyService, private _snackBar: MatSnackBar){
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    this.maxDate = yyyy + '-' + mm + '-' + dd;
    this.userAddForm = fb.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'mobileNo': ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      'dob': ['', Validators.required],
      'role': ['', [Validators.required, Validators.pattern(/^(user|admin|faculty)$/)]],
      'password': ['', Validators.required],
      'houseNo': [, Validators.required],
      'street': ['', Validators.required],
      'area': ['', Validators.required],
      'city': ['', Validators.required],
      'state': ['', Validators.required],
      'country': ['', Validators.required],
      'pincode': [, [Validators.required, Validators.pattern(/^\d{6}$/)]],
    });
    this.userService.getUsers().subscribe((data) => {
      this.arrUsers = data;
    });
    this.facultyService.getFaculty().subscribe(data=>{
      this.arrFaculty=data
    });
  }

  get f(){ return this.userAddForm.controls;}

  onSubmit(frmValue: any): void{
    if(!this.userAddForm.valid){
      console.log("Not Valid")
      return
    }
    if(this.arrUsers.length==0){
      this.tempId=1;
    }
    else {
      this.tempId=Number(this.arrUsers[this.arrUsers.length-1].id) +1;
    }
    if(frmValue['role']=='faculty'){
      if (this.arrFaculty.length === 0) {
        this.tempFId = 1;
      } else {
        this.tempFId = Number(this.arrFaculty[this.arrFaculty.length - 1].id) + 1;
      }
    }

    const tempFaculty = new Faculty(
      this.tempFId,
      this.tempId,
      []
    );
    this.facultyService.addFaculty(tempFaculty).subscribe();
    console.log("Faculty added successfully");
    var tempUser = new User(this.tempId,frmValue['firstName'],frmValue['lastName'],frmValue['email'],frmValue['mobileNo'],frmValue['dob'],frmValue['role'],frmValue['password'],new Address(this.tempId,frmValue['houseNo'],frmValue['street'],frmValue['area'],frmValue['city'],frmValue['state'],frmValue['country'],frmValue['pincode']));
    this.userService.addUser(tempUser).subscribe();
    if(frmValue['role']=='faculty'){
      this._snackBar.open('Faculty Added Successfully!!', 'Close', {
        duration: 2000,
      });
    }
    else{
      this._snackBar.open('User Added Successfully!!', 'Close', {
        duration: 2000,
      });
    }
  }
}
