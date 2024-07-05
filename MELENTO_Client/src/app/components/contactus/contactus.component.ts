import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent {
  contactForm: FormGroup;
  secretKey: string = 'xldrrder';

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private _snackBar: MatSnackBar) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  get f() { return this.contactForm.controls; }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const { name, email, subject, message } = this.contactForm.value;

    this.sendEmail(name, email, subject, message);
  }
  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 2000;
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';

    this._snackBar.open(message, action, config);
  }

  showMessage() {
    this.openSnackBar('Message Sent successfully!!', 'Close');
  }
  sendEmail(name: string, email: string, subject: string, message: string): void {
    const url = `https://formspree.io/f/${this.secretKey}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    const data = `name=${name}&email=${email}&subject=${subject}&message=${message}`;

    this.httpClient.post<any>(url, data, httpOptions).subscribe({
      next: responseData => {
        this.showMessage();
        this.contactForm.reset();
      },
      error: error => {
        console.error('Error sending email:', error);
      }
    });
  }
}
