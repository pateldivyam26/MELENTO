import { Component, EventEmitter, Output } from '@angular/core';
import { AssessmentCard } from '../../models/assessmentCard';
import { User } from '../../models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../../services/cart.service';
import { Assessment } from '../../models/assessment';
import { AssessmentsService } from '../../services/assessments.service';
import { Address } from '../../models/address';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})

export class BannerComponent {
  userLoggedIn: boolean = false;
  adminRole: boolean = false;
  newAssment: number = 0;
  minBadge: number = 0;
  searchTerm: string = '';
  assessments: Assessment[] = [];
  userInitials: string = '';
  arrUser: User[] = []
  user = new User(0, "", "", "", "", "", "", "", new Address(0, 0, '', '', '', '', '', 0));
  tempId: string = '';
  userId: number = 0;
  cart: Cart[] = [];
  constructor(private router: Router, private cartService: CartService, private assessmentsService: AssessmentsService, private userService: UserService) {
    var role = localStorage.getItem('role')
    if (role == 'admin' || role === 'faculty') {
      this.adminRole = true;
    }
    if (role !== null) {
      this.userLoggedIn = true;
      this.cartService.getcheckout().subscribe(data => {
        this.newAssment += data;
      });
    this.cartService.getCart().subscribe(data => {
      this.cart = data;
      this.updateBadgeCount();
    });
    this.assessmentsService.getAssessments().subscribe(data => {
      this.assessments = data;
    });
  }

    var tId = localStorage.getItem('id');
    // console.log(tId);
    if (tId != null) this.tempId = tId.toString();
    if (tId !== null) {
      this.userService.getUsers().subscribe(data => {
        this.arrUser = data;
        for (let i = 0; i < this.arrUser.length; i++) {
          if (this.tempId === (this.arrUser[i].id).toString()) {
            this.userId = this.arrUser[i].id;
          }
        }
        this.userService.getUserById(this.userId).subscribe(data => {
          this.user = data;
          this.setUserInitials();
        })
      })
    }
  }

  setUserInitials() {
    if (this.user) {
      const firstNameInitial = this.user.firstName.charAt(0).toUpperCase();
      const lastNameInitial = this.user.lastName.charAt(0).toUpperCase();
      this.userInitials = `${firstNameInitial}${lastNameInitial}`;
    }
  }

  logout() {
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    this.userLoggedIn = false;
    console.log("User logged out");
    this.router.navigate(['/home']).then(() => {
      location.reload();
    });
  }

  updateBadgeCount() {
    if (this.cart.length > 0) {
      let totalCount = 0;
      for (let i = 0; i < this.cart.length; i++) {
        totalCount += this.cart[i].quantity.reduce((a, b) => a + b, 0);
      }
      this.minBadge = totalCount;
    }
    else {
      this.minBadge = 0;
    }
  }
  newAssessment(event: any) {
    this.newAssment = event;
  }
  CheckNewAssment() {
    if (this.newAssment > 0) {
      return true;
    }
    return false;
  }
  resetBadge() {
    this.newAssment = 0;
    // console.log("resetted");
  }
  onSearchSubmit(event: any) {
    event.preventDefault();
    const exactMatch = this.assessments.find(assessment =>
      assessment.assessmentName.toLowerCase() === this.searchTerm.toLowerCase()
    );
    if (exactMatch) {
      this.router.navigate(['viewassessmentdetails/', exactMatch.id]);
    } else {
      console.log('No matching assessment found');
    }
  }
}
