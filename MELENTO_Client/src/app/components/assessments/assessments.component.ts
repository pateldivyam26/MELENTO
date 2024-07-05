import { Component, Input } from '@angular/core';
import { AssessmentCard } from '../../models/assessmentCard';
import { AssessmentsService } from '../../services/assessments.service';
import { Route, Router } from '@angular/router';
import { Assessment } from '../../models/assessment';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { catchError, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrl: './assessments.component.scss'
})
export class AssessmentsComponent {
  arrAssessments:Assessment[] = []
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalItems: number = 0;
  totalPages: number = 0;
  active:boolean=false
  searchTerm: string = '';
  assessment: Assessment = new Assessment(0,'','',0,'','',[],0,0,0, true)
  constructor(private assessmentService:AssessmentsService, private router:Router,private cartService: CartService,
    private _snackBar: MatSnackBar ) {
    this.assessmentService.getAssessments().subscribe((data) => {
      this.arrAssessments = data;
      // console.log(data);
      this.totalItems = this.arrAssessments.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    });
    
  }
  
  displayAssessments() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.arrAssessments.slice(startIndex, endIndex);
  }

  renderPagination() {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  setPage(event: Event, page: number) {
    event.preventDefault();
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
  }

  previousPage(event: Event) {
    event.preventDefault();
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(event: Event) {
    event.preventDefault();
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  displayDetails(aId: number) {
    // console.log(aId)
    // this.assessment = this.assessmentService.getAssessmentById(aId)

    this.assessmentService.getAssessmentById(aId).subscribe(data=>{
      this.assessment=data})

    // console.log(this.assessment)
    this.router.navigate(['viewassessmentdetails/' + aId])
  }
  AddToCart(c:any){
    // console.log(c);
    const userId=localStorage.getItem('id');
    // console.log(userId);
    if(userId==null){
      console.log("Please login");
      this._snackBar.open('Please Login', 'Close', {
        duration: 2000,
      });
      return;
      // this.router.navigate(['login']); need to do this part. right now no url exists for login
    }
    else{
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
