import { Injectable } from '@angular/core';
import { ContactUs } from '../models/contactus';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {

  arrContactForm: ContactUs[] = []
  constructor() {
    this,this.arrContactForm = [
    ]
  }
}
