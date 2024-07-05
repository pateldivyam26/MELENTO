export class Trainee{
    id:number
    userId:number
    arrAssessments:TraineeAssessment[]
    constructor(id:number, userId:number, arrAssessments:TraineeAssessment[]){
        this.id = id;
        this.userId = userId;
        this.arrAssessments = arrAssessments;
    }
}

export class TraineeAssessment{
    id:number
    quantity:number
    constructor(id:number, quantity:number){
        this.id = id;
        this.quantity = quantity;
    }
}