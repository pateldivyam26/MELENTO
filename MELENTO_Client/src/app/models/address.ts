export class Address{
    id:number
    houseNo:number
    street:string
    area:string
    city:string
    state:string
    country:string
    pincode:number
    constructor(id:number,houseNo:number, street:string, area:string, city:string, state:string, country:string, pincode:number){
        this.id = id;
        this.houseNo = houseNo;
        this.street = street;
        this.area = area;
        this.city = city;
        this.state = state;
        this.country = country;
        this.pincode = pincode;
    }
}