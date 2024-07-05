import { Injectable } from '@angular/core';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  arrQuestions : Question[] = [];
  constructor() { 
    this.arrQuestions=[
      new Question(0,'','',[],'')
    ];
  }

  getQuestions(){
    return this.arrQuestions;
  }

  getQuestionById(id:number){
    for(var i=0;i<this.arrQuestions.length;i++){
      if(id==this.arrQuestions[i].id){
        return this.arrQuestions[i];
      }
    }
    return new Question(0,'','',[],'');
  }
}
