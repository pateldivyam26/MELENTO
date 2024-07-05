export class AssessmentScore{
    id:number
    assessmentId:number
    traineeId:number
    facultyId:number
    score:number
    assessmentScore:number[]
    result:string
    constructor(id:number, assessmentId:number, traineeId:number, facultyId:number, score:number,assessmentScore:number[]=[],result:string=''){
        this.id = id;
        this.assessmentId = assessmentId;
        this.traineeId = traineeId;
        this.facultyId = facultyId;
        this.score = score;
        this.assessmentScore = assessmentScore;
        this.result=result;
    }
}