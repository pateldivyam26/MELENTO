import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service'; // Make sure to create this service
import { Address } from '../../models/address';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { Cart } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userAddForm: FormGroup;
  tempId: number = 0;
  arrUsers: User[] = [];
  maxDate: string = "";
  uniqueEmail: boolean = true;
  constructor(private fb: FormBuilder, private userService: UserService,private router: Router,private cartService: CartService, private _snackBar: MatSnackBar) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    this.maxDate = yyyy + '-' + mm + '-' + dd;

    this.userAddForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      dob: ['', [Validators.required]],
      role: ['user', [Validators.required, Validators.pattern(/^(user|admin|faculty)$/)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      houseNo: [null, Validators.required],
      street: ['', Validators.required],
      area: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: [null, [Validators.required, Validators.pattern(/^\d{6}$/)]],
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.arrUsers = data;
    });
  }

  get f() { return this.userAddForm.controls; }

  onSubmit(frmValue: any): void {
    if (!this.userAddForm.valid) {
      console.log("Form is not valid");
      return;
    }
    for(var i=0;i<this.arrUsers.length;i++) {
      if(this.arrUsers[i].email==frmValue.email) {
        this.uniqueEmail=false;
        console.log("Email already exists");
        return;
      }
    }
    this.uniqueEmail=true;
    if (this.arrUsers.length === 0) {
      this.tempId = 1;
    } else {
      this.tempId = Number(this.arrUsers[this.arrUsers.length - 1].id) + 1;
    }

    const tempUser = new User(
      this.tempId,
      frmValue.firstName,
      frmValue.lastName,
      frmValue.email,
      frmValue.mobileNo,
      frmValue.dob,
      frmValue.role,
      frmValue.password,
      new Address(
        this.tempId,
        frmValue.houseNo,
        frmValue.street,
        frmValue.area,
        frmValue.city,
        frmValue.state,
        frmValue.country,
        frmValue.pincode
      )
    );
    console.log(tempUser);
    this.userService.addUser(tempUser).subscribe(data=>{
      console.log(data);
      console.log("User added successfully");
      this._snackBar.open('User Added Successfully!!', 'Close', {
        duration: 2000,
      });
      const cart= new Cart(this.tempId,[],[],0)
      console.log(cart);
      this.cartService.AddToCart(cart).subscribe(data=>{
        console.log(data);
        console.log("Cart created successfully");
        this.router.navigate(['/home']).then(() => {
          location.reload();
          });
      }
        );
      });
  }

  togglePassword(id: string) {
    const input = document.getElementById(id) as HTMLInputElement;
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password && confirmPassword) {
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ mismatch: true });
      } else {
        confirmPassword.setErrors(null);
      }
    }
    return null;
  }

}
