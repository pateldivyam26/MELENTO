export class AssessmentCard{
    id:number
    assessmentName:string
    assessmentImage:string
    active:boolean
    constructor(id:number, aName:string, aImage:string, aVisible:boolean){
        this.id = id;
        this.assessmentName = aName;
        this.assessmentImage = aImage;
        this.active = aVisible;
    }
}