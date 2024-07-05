export class Attendance{
    id:number
    assessmentId:number
    traineeId:number
    dateTaken:Date
    constructor(id:number=0,assessmentId:number=0,traineeId:number=0, dateTaken:Date){
        this.assessmentId = assessmentId;
        this.traineeId = traineeId;
        this.dateTaken = dateTaken;
        this.id=id;
    }
}