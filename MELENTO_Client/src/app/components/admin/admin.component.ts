import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  adminRole: boolean = false;
  constructor(private router: Router) {
    var role = localStorage.getItem('role')
    if (role === 'admin') {
      this.adminRole = true;
    }
  }
}
