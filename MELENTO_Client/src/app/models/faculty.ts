export class Faculty{
    id:number
    userId:number
    arrAssessmentsIds: number[]
    constructor(id:number, userId:number,arrAssessmentsIds:number[]){
        this.id = id;
        this.userId = userId;
        this.arrAssessmentsIds =arrAssessmentsIds;
    }
}