import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit{
  userExists: boolean = false;
  submitted:boolean=false;
  myForm: FormGroup;
  arrUsers: User[] = [];
  constructor(fb: FormBuilder, private UserService: UserService,private router: Router, private _snackBar: MatSnackBar, private authService:AuthService) {
    this.myForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
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
    // console.log(myForm);
    // var checkuser=false;
    // for (var i = 0; i < this.arrUsers.length; i++) {
    //   // console.log(this.arrUsers[i]);
    //   if (this.arrUsers[i].email == myForm['email']) {
    //     checkuser= true;
    //     if (this.arrUsers[i].password == myForm['password']) {
    //       // console.log('Login successful');
    //       this.showMessage();
    //       // console.log(this.arrUsers[i]);
    //       localStorage.setItem('role', this.arrUsers[i].role);
    //       localStorage.setItem('id', String(this.arrUsers[i].id)); // Convert id to string since local storage only stores string

    //       this.router.navigate(['/home']).then(() => {
    //         location.reload();

    //       });
    //       return;
    //     }
    //   }
    // }
    // this.userExists=checkuser;
    const payload={
      "email":myForm.email,
      "password":myForm.password
    }
    this.authService.login(payload).subscribe((res: any) => {
      console.log(res);
      var data = res; // directly use res
      if (data && data.user) {
          this.showMessage();
          localStorage.setItem('role', data.user.role);
          localStorage.setItem('id', String(data.user._id)); // use _id instead of id
          localStorage.setItem('authToken', data.token);
  
          this.router.navigate(['/home']).then(() => {
              location.reload();
          });
      }
  },(error:any)=>{
    if (error.status === 404) {
      console.log(error); 
  }
});
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
