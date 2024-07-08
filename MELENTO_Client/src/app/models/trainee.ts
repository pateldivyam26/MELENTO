export class Trainee{
    id:number
    userId:number
    arrAssessments:TraineeAssessment[]
    completedAssessments:completedAssessments[]
    constructor(id:number, userId:number, arrAssessments:TraineeAssessment[],completedAssessments:completedAssessments[]=[]){
        this.id = id;
        this.userId = userId;
        this.arrAssessments = arrAssessments;
        this.completedAssessments = completedAssessments;
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
export class completedAssessments{
    id:number  // id of the completed assessment== Assessment Score number
    score:number
    constructor( id:number,score:number){
        this.id = id;
        this.score=score;
    }   
}