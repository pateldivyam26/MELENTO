import { Component } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Assessment } from '../../models/assessment';
import { AssessmentsService } from '../../services/assessments.service';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Question, TrueFalseOption, MCQOption } from '../../models/assessment';
import { FormArray } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FacultyService } from '../../services/faculty.service';
import { Faculty } from '../../models/faculty';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-assessment',
  templateUrl: './add-assessment.component.html',
  styleUrls: ['./add-assessment.component.scss'],
})
export class AddAssessmentComponent {
  firstFormGroup: FormGroup;
  questionForm: FormGroup;
  isLinear = false;
  assessment: Assessment = new Assessment(0,'','',0,'','',[],0,0,0, true)
  arrAssessments: Assessment[] = [];
  role:string='';
  faculty:Faculty=new Faculty(0,0,[]);
  arrFaculty:Faculty[]=[];
  facultyId:number=0;
  constructor(private _formBuilder: FormBuilder,private assessmentservice:AssessmentsService,private facultyService:FacultyService,
    private _snackBar: MatSnackBar,private router:Router) {
    this.firstFormGroup = this._formBuilder.group({
      assessmentNameCtrl: ['', Validators.required],
      assessmentDateCtrl: ['', Validators.required],
      assessmentTimeCtrl: [60, Validators.required],
      assessmentImageCtrl: ['', Validators.required],
      assessmentDescriptionCtrl: ['', Validators.required],
      facultyIdCtrl: ['', Validators.required],
      totalMarksCtrl: ['', Validators.required],
      priceCtrl: ['', Validators.required],
      activeCtrl: [true, Validators.required],
    });
    this.assessmentservice.getAssessments().subscribe(data=>{
      this.arrAssessments=data;
    })
    
    // AssessmentsService.getAssessments().subscribe((data) => {
    //   this.arrAssessments = data;
    // }

    this.questionForm = this._formBuilder.group({
      questions: this._formBuilder.array([this.createQuestion()]),
    });
    this.facultyService.getFaculty().subscribe(data=>{
    this.arrFaculty=data;
    var currole = localStorage.getItem('role');
    var id = localStorage.getItem('id');
    if(currole){ this.role = currole};
    if (currole == 'faculty') {
      for(var i=0;i<this.arrFaculty.length;i++){
        // console.log(this.arrFaculty[i]);
        if(this.arrFaculty[i].userId==Number(id)){
          this.facultyId=this.arrFaculty[i].id;
          this.firstFormGroup.get('facultyIdCtrl')?.setValue(this.arrFaculty[i].id);
        }
      }
    }});
  }

  saveFirstFormData(firstFormGroup: any) {
    if (firstFormGroup.value.invalid) return;
    this.assessment.id =
      Number(this.arrAssessments[this.arrAssessments.length - 1].id) + 1; // need to change this in the service to add string in json data
    this.assessment.assessmentName = firstFormGroup.value.assessmentNameCtrl;
    this.assessment.assessmentDate = firstFormGroup.value.assessmentDateCtrl;
    this.assessment.assessmentTime = firstFormGroup.value.assessmentTimeCtrl;
    this.assessment.assessmentImage = firstFormGroup.value.assessmentImageCtrl;
    this.assessment.assessmentDescription =
    firstFormGroup.value.assessmentDescriptionCtrl;
    this.assessment.facultyId = firstFormGroup.value.facultyIdCtrl;
    this.assessment.totalMarks = firstFormGroup.value.totalMarksCtrl;
    this.assessment.price = firstFormGroup.value.priceCtrl;
    // this.assessment.active = firstFormGroup.value.activeCtrl;
   if(firstFormGroup.value.activeCtrl=='true'){
     this.assessment.active=true;
   }
   else{
      this.assessment.active=false;
   }

    // console.log(this.assessment);
  }

  createQuestion(): FormGroup {
    return this._formBuilder.group({
      qText: ['', Validators.required],
      qOption1: [''],
      qOption2: [''],
      qOption3: [''],
      qOption4: [''],
      answer: ['', Validators.required],
      qType: ['', Validators.required],
    });
  }

  get questionsArray(): FormArray {
    return this.questionForm.get('questions') as FormArray;
  }

  addQuestion() {
    this.questionsArray.push(this.createQuestion());
  }

  getOptionsArray(index: number): FormArray {
    return this.questionsArray.at(index).get('options') as FormArray;
  }

  removeQuestion(index: number) {
    this.questionsArray.removeAt(index);
  }

  assessmentArr(): FormArray {
    return this.questionForm.get('questions') as FormArray;
  }

  typeofQ(qType: string): string {
    return qType;
  }

  validTypeOfQ(qType: string): boolean {
    return qType === 'MCQ' || qType === 'TOF';
  }

  public addQuestionFormGroup() {
    this.assessmentArr().push(this.createQuestion());
  }

  saveSecondStepData(formdata: any) {
    console.log(formdata);
    if (formdata.valid) {
      const formData = this.questionForm.value;
      // console.log(formData.questions);
      const questionsArray: any[] = [];

      formData.questions.forEach((questionData: any) => {
        if (questionData.qType === 'MCQ') {
          questionsArray.push({
            id: this.assessment.questions.length + 1,
            questionText: questionData.qText,
            Options: [
              questionData.qOption1,
              questionData.qOption2,
              questionData.qOption3,
              questionData.qOption4,
            ],
            answer: questionData.answer,
            qType: questionData.qType,
          });
        } else if (questionData.qType === 'TOF') {
          questionsArray.push({
            id: this.assessment.questions.length + 1,
            qText: questionData.qText,
            Options: ['True', 'False'],
            answer: questionData.answer,
            qType: questionData.qType,
          });
        }
      });

      this.assessment.questions = questionsArray;
      // console.log('Questions:', this.assessment.questions);
      // console.log(this.assessment);
      this.assessmentservice
        .addAssessment(this.assessment)
        .subscribe((data) => {
          // console.log(data);
        });
      this.AddToFaculty();
    }
  }
  AddToFaculty() {
    var id = this.assessment.facultyId;
    // console.log(id);
    this.facultyService.getFacultyById(id).subscribe((data) => {
      this.faculty=data;
      this.faculty.arrAssessmentsIds.push(this.assessment.id);
      this.facultyService.updateFaculty(this.faculty).subscribe();
    });
  }

  public removeOrClearQuestion(i: number) {
    const questions = this.assessmentArr();
    if (questions.length > 1) {
      questions.removeAt(i);
    } else {
      questions.reset();
    }
  }
  lastquestion(i: number) {
    if (i == this.questionsArray.length - 1) {
      return true;
    }
    return false;
  }
  checkrole(): boolean {
    if (this.role == 'faculty') return true;
    return false;
  }

  reset(){
    this.firstFormGroup.reset();
    this.questionForm.reset();
    this.firstFormGroup.get('facultyIdCtrl')?.setValue(this.facultyId);
    this._snackBar.open('Assessment Successfully Added', 'Close', {
      duration: 2000,
    });
    location.reload();
  }
}
