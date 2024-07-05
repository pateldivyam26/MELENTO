export class Assessment {
    id: number;
    assessmentName: string;
    assessmentDate: string;
    assessmentTime: number;
    assessmentImage: string;
    assessmentDescription: string;
    questions: Question[];
    facultyId: number;
    totalMarks: number;
    price: number;
    active:boolean;
    constructor(id: number,assessmentName: string,assessmentDate: string,assessmentTime: number,assessmentImage:string,assessmentDescription: string,questions: Question[],facultyId: number,totalMarks: number,price: number,active:boolean) {
        this.id = id;
        this.assessmentName = assessmentName;
        this.assessmentDate = assessmentDate;
        this.assessmentTime = assessmentTime;
        this.assessmentImage = assessmentImage;
        this.assessmentDescription = assessmentDescription;
        this.questions = questions;
        this.facultyId = facultyId;
        this.totalMarks = totalMarks;
        this.price = price;
        this.active=active;
    }
}

export class Question {
    id: number;
    type: string;
    questionText: string;
    options: string[];
    answer: string;

    constructor(id: number,type: string,questionText: string,options: string[],answer: string) {
        this.id = id;
        this.type = type;
        this.questionText = questionText;
        this.options = options;
        this.answer = answer;
    }
}

export class MCQOption {
    optionText: string;
    constructor(optionText: string) {
        this.optionText = optionText;
    }
}

export class TrueFalseOption {
    optionText: boolean;
    constructor(optionText: boolean) {
        this.optionText = optionText;
    }
}