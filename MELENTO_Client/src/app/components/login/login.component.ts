import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userExists: boolean = false;
  submitted:boolean=false;
  myForm: FormGroup;
  arrUsers: User[] = [];
  constructor(fb: FormBuilder, private UserService: UserService,private router: Router, private _snackBar: MatSnackBar) {
    this.myForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.UserService.getUsers().subscribe((data) => {
      this.arrUsers = data;
      // console.log(this.arrUsers);
    });
  }

  get f() {
    return this.myForm.controls;
  }

  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';

    this._snackBar.open(message, action, config);
  }

  showMessage() {
    this.openSnackBar('Login Successful!!', 'Close');
  }

  verify_login(myForm: any) {
    if (this.myForm.invalid) {
      console.log('Not valid');
      return;
    }
    console.log(myForm);
    var checkuser=false;
    for (var i = 0; i < this.arrUsers.length; i++) {
      // console.log(this.arrUsers[i]);
      if (this.arrUsers[i].email == myForm['email']) {
        checkuser= true;
        if (this.arrUsers[i].password == myForm['password']) {
          // console.log('Login successful');
          this.showMessage();
          // console.log(this.arrUsers[i]);
          localStorage.setItem('role', this.arrUsers[i].role);
          localStorage.setItem('id', String(this.arrUsers[i].id)); // Convert id to string since local storage only stores string
          
          this.router.navigate(['/home']).then(() => {
            location.reload();
            
          });
          return;
        }
      }
    }
    this.userExists=checkuser;
    this.submitted = true;
    
    console.log('Kindly register To login'); // need to change this font colour to better match the statement.
  }
  togglepassword() {
    const x = document.getElementById('password');
    if (x && x.getAttribute('type') == 'password') {
      x.setAttribute('type', 'text');
    } else if (x) {
      x.setAttribute('type', 'password');
    }
  }
}
