import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Cart } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { TraineeService } from '../../services/trainee.service';
import { Trainee, TraineeAssessment } from '../../models/trainee';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  cart: Cart = new Cart(0, [], [], 0);
  cartExists: boolean = false;
  trainee: Trainee = new Trainee(0, 0, [new TraineeAssessment(0, 0)]);
  arrTrainees: Trainee[] = [];
  traineeexists: boolean = false;
  traineeId: number = 0;
  tempId: string = '';
  handler: any = null;
  constructor(private cartService: CartService, private router: Router, private traineeService: TraineeService) {
    var tId = localStorage.getItem('id');
    if (tId != null) this.tempId = tId.toString();
    if (this.tempId !== null) {
      this.cartService.getCartById(this.tempId.toString()).subscribe((data) => {
        this.cart = data;
        if (this.cart.arrAssessments.length > 0) {
          this.cartExists = true;
        }
      });
      this.traineeService.getTrainee().subscribe(data => {
        this.arrTrainees = data;
        for (var i = 0; i < this.arrTrainees.length; i++) {
          if (this.tempId === (this.arrTrainees[i].userId).toString()) {
            this.traineeexists = true;
            this.traineeId = this.arrTrainees[i].id;
          }
        }
        if (this.traineeexists) {
          this.traineeService.getTraineeById(this.traineeId).subscribe(data => {
            this.trainee = data;
          })
        }
      })
    }
  }
  ngOnInit() {
    this.loadStripe();
  }
  checkquantity(i: number): boolean {
    if (this.cart.quantity[i] > 1) {
      return false;
    }
    return true;
  }
  increasequantity(i: number): void {
    this.cart.quantity[i] += 1;
    this.cart.total += this.cart.arrAssessments[i].price;
    this.cartService.UpdateCart(this.cart).subscribe();
  }
  decreasequantity(i: number): void {
    if (this.cart.quantity[i] > 0) {
      this.cart.quantity[i] -= 1;
      this.cart.total -= this.cart.arrAssessments[i].price;
    }
    this.cartService.UpdateCart(this.cart).subscribe();
  }
  checkout() {
    if (this.traineeexists) {
      this.updateTrainee();
    }
    else {
      this.addTrainee();
    }
    this.cartService.checkout(this.cart.arrAssessments.length);
    this.cart.arrAssessments = [];
    this.cart.quantity = [];
    this.cart.total = 0;
    this.cartService.UpdateCart(this.cart).subscribe();
    this.router.navigate(['/home']);
  }

  removeFromCart(i: number): void {
    this.cart.total -= this.cart.arrAssessments[i].price * this.cart.quantity[i];
    this.cart.arrAssessments.splice(i, 1);
    this.cart.quantity.splice(i, 1);
    this.cartService.UpdateCart(this.cart).subscribe();

  }
  addTrainee() {
    // console.log(this.arrTrainees.length-1);
    if (this.arrTrainees.length == 0) {
      this.trainee.id = 1;
    }
    else { this.trainee.id = Number(this.arrTrainees[this.arrTrainees.length - 1].id) + 1; }
    this.trainee.userId = Number(this.tempId);
    this.trainee.arrAssessments = [];
    for (var i = 0; i < this.cart.arrAssessments.length; i++) {
      var traineeAssmnt = new TraineeAssessment(this.cart.arrAssessments[i].id, this.cart.quantity[i]);
      this.trainee.arrAssessments.push(traineeAssmnt);
    }
    this.traineeService.addTrainee(this.trainee).subscribe();
  }
  updateTrainee() {
    for (var i = 0; i < this.cart.arrAssessments.length; i++) {
      var temp = false;
      for (var j = 0; j < this.trainee.arrAssessments.length; j++) {
        if (this.trainee.arrAssessments[j].id == this.cart.arrAssessments[i].id) {
          this.trainee.arrAssessments[j].quantity += this.cart.quantity[i];
          temp = true;
        }
      }
      if (!temp) {
        var traineeAssmnt = new TraineeAssessment(this.cart.arrAssessments[i].id, this.cart.quantity[i]);
        this.trainee.arrAssessments.push(traineeAssmnt);
      }
    }
    this.traineeService.updateTrainee(this.trainee).subscribe();
  }
  pay(amount: number) {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51PazcJRxHUWJRFCLLq9XpodoBG2F2kldzMwnrn0iPVMjceSXhWA1Fqc2zPOuTFai0jVks5vi7gWqCBDvBXlLhiZP00ZbzMXR9f',
      locale: 'auto',
      token: function (token: any) {
        console.log(token);
        this.checkout();
      }
    });

    handler.open({
      name: 'Assessment Portal',
      description: 'Assessment Purchase',
      amount: amount * 100
    });
  }

  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51PazcJRxHUWJRFCLLq9XpodoBG2F2kldzMwnrn0iPVMjceSXhWA1Fqc2zPOuTFai0jVks5vi7gWqCBDvBXlLhiZP00ZbzMXR9f',
          locale: 'auto',
          token: function (token: any) {
            console.log(token);
            this.checkout();
          }
        });
      };

      window.document.body.appendChild(s);
    }
  }
}

