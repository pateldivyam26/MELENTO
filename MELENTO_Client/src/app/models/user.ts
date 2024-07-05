import { MinValidator } from "@angular/forms";
import { Address } from "./address";

export class User{
    id:number
    firstName:string
    lastName:string
    email:string
    mobileNo:string
    dob:string
    role:string
    password:string
    address:Address
    constructor(id:number, firstName:string, lastName:string, email:string, mobileNo:string, dob:string, role:string, password:string, address:Address){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.mobileNo = mobileNo;
        this.dob = dob;
        this.role = role;
        this.password = password;
        this.address = address;
    }
}