import { Assessment } from "./assessment"

export class Cart{
    id:number
    arrAssessments: Assessment[]
    quantity: number[]
    total: number
    constructor(id:number, arrAssessments: Assessment[], quantity: number[], total: number){
        this.id = id
        this.arrAssessments = arrAssessments
        this.quantity = quantity
        this.total = total
    }

}