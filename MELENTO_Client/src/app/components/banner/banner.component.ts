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
    constructor(private router: Router, private cartService: CartService, private assessmentsService: AssessmentsService) {
        var role = localStorage.getItem('role')
        if (role == 'admin' || role === 'faculty') {
            this.adminRole = true;
        }
        if (role !== null) {
            this.userLoggedIn = true;
        }
        this.cartService.getcheckout().subscribe(data => {
            this.newAssment += data;
        });
        this.assessmentsService.getAssessments().subscribe(data => {
            this.assessments = data;
        });
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
