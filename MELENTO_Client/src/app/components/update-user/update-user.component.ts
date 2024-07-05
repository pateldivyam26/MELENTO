import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Address } from '../../models/address';
import { Faculty } from '../../models/faculty';
import { FacultyService } from '../../services/faculty.service';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {
  userAddForm: FormGroup;
  arrUsers: User[] = [];
  arrFaculty: Faculty[] = [];
  user = new User(0, "", "", "", "", "", "", "", new Address(0, 0, '', '', '', '', '',0))
  idUpdated: number = 0;
  tempId: number = 0;
  maxDate: string="";
  constructor(fb: FormBuilder, private userService: UserService, private facultyService: FacultyService) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    this.maxDate = yyyy + '-' + mm + '-' + dd;
    this.userService.getUsers().subscribe(data=>{
      this.arrUsers=data
    })
    this.facultyService.getFaculty().subscribe(data=>{
      this.arrFaculty=data
    })
    this.userAddForm = fb.group({
      'id': [, Validators.required],
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
  }

  get f() { return this.userAddForm.controls; }
  onChangeType(evt: any) {
    var idObtained = evt.target.value;
    this.idUpdated = parseInt(idObtained.split(':')[1].trim());
    
    for (var i = 0; i < this.arrUsers.length; i++) {
      if (this.idUpdated == this.arrUsers[i].id) {
        this.user = this.arrUsers[i];
      }
    }
    this.userAddForm.get('firstName')?.setValue(this.user.firstName.toString());
    this.userAddForm.get('lastName')?.setValue(this.user.lastName.toString());
    this.userAddForm.get('email')?.setValue(this.user.email.toString());
    this.userAddForm.get('mobileNo')?.setValue(this.user.mobileNo.toString());
    this.userAddForm.get('dob')?.setValue(this.user.dob);
    this.userAddForm.get('role')?.setValue(this.user.role.toString());
    this.userAddForm.get('password')?.setValue(this.user.password.toString());
    this.userAddForm.get('houseNo')?.setValue(this.user.address.houseNo);
    this.userAddForm.get('street')?.setValue(this.user.address.street.toString());
    this.userAddForm.get('area')?.setValue(this.user.address.area.toString());
    this.userAddForm.get('city')?.setValue(this.user.address.city.toString());
    this.userAddForm.get('state')?.setValue(this.user.address.state.toString());
    this.userAddForm.get('country')?.setValue(this.user.address.country.toString());
    this.userAddForm.get('pincode')?.setValue(this.user.address.pincode);
  }
  onSubmit(frmValue: any): void {
    if (!this.userAddForm.valid) {
      console.log("Not Valid")
      return
    }
    if(frmValue['role']=='faculty'){
      if (this.arrFaculty.length === 0) {
        this.tempId = 1;
      } else {
        this.tempId = Number(this.arrFaculty[this.arrFaculty.length - 1].id) + 1;
      }
      
      
      const tempFaculty = new Faculty(
        this.tempId,
        frmValue.id,
        []
        );
        
        this.facultyService.addFaculty(tempFaculty).subscribe();
        console.log("Faculty added successfully");
      }

    this.user.firstName=frmValue['firstName'];
    this.user.lastName=frmValue['lastName'];
    this.user.email=frmValue['email'];
    this.user.mobileNo=frmValue['mobileNo'];
    this.user.dob=frmValue['dob'];
    this.user.role=frmValue['role'];
    this.user.password=frmValue['password'];
    this.user.address.houseNo=frmValue['houseNo'];
    this.user.address.street=frmValue['street'];
    this.user.address.area=frmValue['area'];
    this.user.address.city=frmValue['city'];
    this.user.address.state=frmValue['state'];
    this.user.address.country=frmValue['country'];
    this.user.address.pincode=frmValue['pincode'];
    this.userService.updateUser(this.user).subscribe();
  }
  
}
