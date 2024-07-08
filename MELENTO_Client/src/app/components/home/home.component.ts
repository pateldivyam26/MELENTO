import { Component } from '@angular/core';
import { AssessmentCard } from '../../models/assessmentCard';
import { AssessmentsService } from '../../services/assessments.service';
import { Router } from '@angular/router';
import { Assessment } from '../../models/assessment';
import { CartService } from '../../services/cart.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})

export class HomeComponent {
    arrAssessments: Assessment[] = []
    lastThreeAssessments: Assessment[] = [];
    assessment: Assessment = new Assessment(0, '', '', 0, '', '', [], 0, 0, 0, true)
    displayDetails(aId: number) {
        // console.log(aId)
        // this.assessment = this.assessmentService.getAssessmentById(aId)
        this.assessmentService.getAssessmentById(aId).subscribe(data => {
            this.assessment = data
        })
        // console.log(this.assessment)
        this.router.navigate(['viewassessmentdetails/' + aId])
    }
    constructor(private assessmentService: AssessmentsService, private router: Router, private cartService: CartService, private _snackBar: MatSnackBar) {
        this.assessmentService.getAssessments().subscribe((data) => {
            this.arrAssessments = data;
            this.lastThreeAssessments = this.arrAssessments.slice(-3);
        });
    }

    openSnackBar(message: string, action: string) {
      const config = new MatSnackBarConfig();
      config.duration = 2000;
      config.horizontalPosition = 'center';
      config.verticalPosition = 'top';
  
      this._snackBar.open(message, action, config);
    }
  
    showMessage() {
      this.openSnackBar('Please Login!!', 'Close');
    }
    AddToCart(c: any) {
        // console.log(c);
        const userId = localStorage.getItem('id');
        // console.log(userId);
        if (userId == null) {
          this.showMessage();
            return;
            // this.router.navigate(['login']); need to do this part. right now no url exists for login
        }
        else {
            this.cartService.getCartById((userId)).subscribe(existingCart => {
                var flag=true;
                  existingCart.arrAssessments.forEach((cart,index)=>{
                    if(cart.id===c.id){
                      flag=false;
                      existingCart.quantity[index]++;
                      existingCart.total += c.price;
                      this.cartService.UpdateCart(existingCart).subscribe(data => {
                        console.log(data);
                      });
                      return;
                    }
                  })
                  if(flag){
                  existingCart.arrAssessments.push(c);
                  existingCart.quantity.push(1);
                  existingCart.total += c.price;
                  this.cartService.UpdateCart(existingCart).subscribe(data => {
                    console.log(data);
                  });
                }
              });
        }
    }
}
