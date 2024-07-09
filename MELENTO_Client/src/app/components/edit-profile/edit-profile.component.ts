import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Address } from '../../models/address';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  userAddForm: FormGroup;
  user = new User(0, "", "", "", "", "", "", "", new Address(0, 0, '', '', '', '', '', 0));
  maxDate: string = '';

  constructor(private fb: FormBuilder,private userService: UserService,private _snackBar: MatSnackBar) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    this.maxDate = `${yyyy}-${mm}-${dd}`;

    this.userAddForm = this.fb.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      dob: ['', Validators.required],
      role: [{ value: '', disabled: true }, Validators.required],
      password: ['', Validators.required],
      houseNo: ['', Validators.required],
      street: ['', Validators.required],
      area: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });

    this.userService.getUserById(2).subscribe((data: User) => {
      if (data) {
        this.user = data;
        this.populateForm();
      } else {
        console.log('Error Updating Data')
      }
    });
  }

  get f() { return this.userAddForm.controls; }

  populateForm() {
    this.userAddForm.patchValue({
      id: this.user.id,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      mobileNo: this.user.mobileNo,
      dob: this.user.dob,
      role: this.user.role,
      password: this.user.password,
      houseNo: this.user.address.houseNo,
      street: this.user.address.street,
      area: this.user.address.area,
      city: this.user.address.city,
      state: this.user.address.state,
      country: this.user.address.country,
      pincode: this.user.address.pincode
    });
  }

  onSubmit() {
    if (this.userAddForm.invalid) {
      return;
    }

    this.user.firstName = this.f['firstName'].value;
    this.user.lastName = this.f['lastName'].value;
    this.user.mobileNo = this.f['mobileNo'].value;
    this.user.dob = this.f['dob'].value;
    this.user.password = this.f['password'].value;
    this.user.address.houseNo = this.f['houseNo'].value;
    this.user.address.street = this.f['street'].value;
    this.user.address.area = this.f['area'].value;
    this.user.address.city = this.f['city'].value;
    this.user.address.state = this.f['state'].value;
    this.user.address.country = this.f['country'].value;
    this.user.address.pincode = this.f['pincode'].value;

    this.userService.updateUser(this.user).subscribe(() => {
      this.showMessage('User Updated Successfully!!');
    }, error => {
      console.error('Error updating user:', error);
    });
  }

  showMessage(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 2000;
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';

    this._snackBar.open(message, 'Close', config);
  }
}
