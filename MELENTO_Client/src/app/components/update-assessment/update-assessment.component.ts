  import { Component } from '@angular/core';
  import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
  import { Assessment, Question } from '../../models/assessment';
  import { AssessmentsService } from '../../services/assessments.service';
  import { first } from 'rxjs';
import { Faculty } from '../../models/faculty';
import { FacultyService } from '../../services/faculty.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

  @Component({
    selector: 'app-update-assessment',
    templateUrl: './update-assessment.component.html',
    styleUrls: ['./update-assessment.component.scss']
  })
  export class UpdateAssessmentComponent {
    firstFormGroup: FormGroup;
    questionForm: FormGroup;
    initialform: FormGroup;
    isLinear = false;
    assessment: Assessment = new Assessment(0, '', '', 0, '','',[], 0, 0, 0, true);
    arrAssessments: Assessment[] = [];
    facultyArrAssessments: Assessment[] = [];
    arrFaculty:Faculty[]=[];  
    idUpdated: number = 0;
    id_selected: boolean = false;
    qselected: Question = new Question(0, '', '', [], '');
    form_value: number = 0;
    Addquestionform: FormGroup ;
    faculty:Faculty=new Faculty(0,0,[]);
    role:string='';
    facultyId:number=0;
    selectedFacultyId:string='';
    constructor(private _formBuilder: FormBuilder, private assessmentservice: AssessmentsService,private facultyService:FacultyService,
      private _snackBar: MatSnackBar,private router:Router) {
      this.firstFormGroup = this._formBuilder.group({
        assessmentNameCtrl: ['', Validators.required],
        assessmentDateCtrl: ['', Validators.required],
        assessmentTimeCtrl: [60, Validators.required],
        assessmentImageCtrl: ['', Validators.required],
        assessmentDescriptionCtrl: ['', Validators.required],
        facultyIdCtrl: [0, Validators.required],
        totalMarksCtrl: ['', Validators.required],
        priceCtrl: ['', Validators.required],
        activeCtrl: [true, Validators.required],
      });

      this.initialform = this._formBuilder.group({
        id: ['', Validators.required]
      });

      this.questionForm = this._formBuilder.group({
        questions: this._formBuilder.array([]),
        id:['']
      });
      this.Addquestionform = this._formBuilder.group({
        questions: this._formBuilder.array([this.createNewQuestion()]),
      })
      this.assessmentservice.getAssessments().subscribe(data => {
        this.arrAssessments = data;
        this.getfacultyAssessments();
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
          this.getfacultyAssessments();
        }
      }
    }
      });
    }
    getfacultyAssessments(){
      if(this.facultyId && this.arrAssessments){
      this.facultyArrAssessments=[];
      for(var i=0;i<this.arrAssessments.length;i++){
        if(this.arrAssessments[i].facultyId==this.facultyId){
          this.facultyArrAssessments.push(this.arrAssessments[i]);
        }
    }
  }
  }
    saveFirstFormData() {
      if (this.firstFormGroup.valid) {
        this.assessment.id = this.idUpdated;
        this.assessment.assessmentName = this.firstFormGroup.value.assessmentNameCtrl;
        this.assessment.assessmentDate = this.firstFormGroup.value.assessmentDateCtrl;
        this.assessment.assessmentTime = this.firstFormGroup.value.assessmentTimeCtrl;
        this.assessment.assessmentImage = this.firstFormGroup.value.assessmentImageCtrl;
        this.assessment.assessmentDescription = this.firstFormGroup.value.assessmentDescriptionCtrl;
        this.assessment.facultyId = this.firstFormGroup.value.facultyIdCtrl;
        this.assessment.totalMarks = this.firstFormGroup.value.totalMarksCtrl;
        this.assessment.price = this.firstFormGroup.value.priceCtrl;
        if(this.firstFormGroup.value.activeCtrl=='true'){
          this.assessment.active=true;
        }
        else{
          this.assessment.active=false;
        }
        // this.assessment.active = Boolean(this.firstFormGroup.value.activeCtrl);
        // console.log(this.assessment);
      }
    }

    createQuestion(): FormGroup {
      return this._formBuilder.group({
        id: ['', Validators.required],
        questionText: ['', Validators.required],
        options: this._formBuilder.array([]),
        answer: ['', Validators.required],
        type: ['', Validators.required]
      });
    }
    get questionsArray(): FormArray {
      return this.questionForm.get('questions') as FormArray;
    }
    get AddquestionsArray(): FormArray {
      return this.Addquestionform.get('questions') as FormArray;
    }
    createNewQuestion(): FormGroup {
      return this._formBuilder.group({
        questionText: ['', Validators.required],
        qOption1: [''],
        qOption2: [''],
        qOption3: [''],
        qOption4: [''],
        answer: ['', Validators.required],
        type: ['', Validators.required]
      });
    }
  

    addQuestion() {
      this.AddquestionsArray.push(this.createNewQuestion());
    }

    removeQuestion(index: number) {
      this.AddquestionsArray.removeAt(index);
    }

    saveSecondStepData(myfrm:any) {
      if (this.Addquestionform.valid) {
        const formData = this.Addquestionform.value;
        console.log(formData);
        const NewquestionsArray: any[] = [];

        formData.questions.forEach((questionData: any) => {
          // console.log(questionData);
          if (questionData.type === 'MCQ') {
            const optionArray=[];
            optionArray.push(questionData.qOption1);
            optionArray.push(questionData.qOption2);
            optionArray.push(questionData.qOption3);
            optionArray.push(questionData.qOption4);
            NewquestionsArray.push({
              id: this.assessment.questions[this.assessment.questions.length-1].id + 1,
              questionText: questionData.questionText,
              options: optionArray,
              answer: questionData.answer,
              type: questionData.type
            });
          } else if (questionData.type === 'TOF') {
            console.log(this.assessment.questions.length-1);
            NewquestionsArray.push({
              id: this.assessment.questions[this.assessment.questions.length-1].id + 1,
              questionText: questionData.questionText,
              options: ['True', 'False'],
              answer: questionData.answer,
              type: questionData.type
            });
          }
        });

        this.assessment.questions.push(...NewquestionsArray);
        console.log(this.assessment.questions);
        this.assessmentservice.updateAssessment(this.assessment).subscribe(data => {
          console.log('Assessment updated:', data);
        });
      }
    }
    getOptions(question: AbstractControl): FormArray {
      return question.get('options') as FormArray;
    }

    onChangeType(event: any) {
      const idObtained = event.target.value;
      this.idUpdated = parseInt(idObtained, 10);
      this.id_selected = true;
      // console.log(event.target.value);
      for(var i=0;i<this.arrAssessments.length;i++) {
        if(this.arrAssessments[i].id== idObtained) {
          this.assessment=this.arrAssessments[i];
      }
    }
        this.patchFirstFormGroupValues();
        // this.populateQuestionForm();
    }
    onChangeQType(event: any) {
      // console.log(event.target.value);
      var qidrecev = event.target.value;
      const qidObtained = parseInt(qidrecev.split(':')[1].trim());
      for(var i=0;i<this.assessment.questions.length;i++) {
        if(this.assessment.questions[i].id==qidObtained){
          this.qselected=this.assessment.questions[i];
        }
    }
    this.populateQuestionForm(this.qselected);
    this.selectedFacultyId=this.assessment.facultyId.toString();
  }

    patchFirstFormGroupValues() {
    this.firstFormGroup.get('assessmentNameCtrl')?.setValue(this.assessment.assessmentName);
    this.firstFormGroup.get('assessmentDateCtrl')?.setValue(this.assessment.assessmentDate);
    this.firstFormGroup.get('assessmentTimeCtrl')?.setValue(this.assessment.assessmentTime);
    this.firstFormGroup.get('assessmentImageCtrl')?.setValue(this.assessment.assessmentImage);
    this.firstFormGroup.get('facultyIdCtrl')?.setValue(this.assessment.facultyId);
    this.firstFormGroup.get('priceCtrl')?.setValue(this.assessment.price);
    this.firstFormGroup.get('totalMarksCtrl')?.setValue(this.assessment.totalMarks);
    this.firstFormGroup.get('assessmentDescriptionCtrl')?.setValue(this.assessment.assessmentDescription);
    // console.log(this.assessment.active);
    this.assessment.active?this.firstFormGroup.get('activeCtrl')?.setValue('true'):this.firstFormGroup.get('activeCtrl')?.setValue('false');
    // this.firstFormGroup.get('activeCtrl')?.setValue(this.assessment.active.toString());
    }
    populateQuestionForm(question:Question) {  
          const questionsArray=this.questionForm.get('questions') as FormArray;
          questionsArray.clear();
            const questionGroup=this._formBuilder.group({
              id:this._formBuilder.control(question.id,Validators.required),
              questionText:this._formBuilder.control(question.questionText,Validators.required),
              options:this._formBuilder.array(question.options.map(option => this._formBuilder.control(option))),
              answer:this._formBuilder.control(question.answer,Validators.required),
              type:this._formBuilder.control(question.type,Validators.required)
            })
            questionsArray.push(questionGroup);
          // console.log(questionsArray.value);
    }

    removeOrClearQuestion(index: number) {
      if (this.questionsArray.length > 1) {
        this.removeQuestion(index);
      } else {
        this.questionsArray.at(index).reset();
      }
    }
    SaveQuestion(){
      if(this.questionsArray.value[0].qType=='MCQ'){
        this.assessment.questions[this.questionForm.value.id -1].answer = this.questionsArray.value[0].answer;
        this.assessment.questions[this.questionForm.value.id -1].questionText = this.questionsArray.value[0].questionText;
        this.assessment.questions[this.questionForm.value.id -1].questionText = this.questionsArray.value[0].questionText;
        this.assessment.questions[this.questionForm.value.id -1].options[0] = this.questionsArray.value[0].options[0];
        this.assessment.questions[this.questionForm.value.id -1].options[1] = this.questionsArray.value[0].options[1];
        this.assessment.questions[this.questionForm.value.id -1].options[2] = this.questionsArray.value[0].options[2];
        this.assessment.questions[this.questionForm.value.id -1].options[3] = this.questionsArray.value[0].options[3];

      }
      else{
        // console.log(this.questionsArray.value[0][0]);
        this.assessment.questions[this.questionForm.value.id -1].answer = this.questionsArray.value[0].answer;
        this.assessment.questions[this.questionForm.value.id -1].questionText = this.questionsArray.value[0].questionText;
        this.assessment.questions[this.questionForm.value.id -1].questionText = this.questionsArray.value[0].questionText;
      }
      // console.log(this.assessment.questions[this.questionForm.value.id -1]);
        
    
    }
    DeleteQuestion(){
      //delete the question from assessment
      this.assessment.questions.splice(this.questionForm.value.id -1,1);
      this.questionsArray.clear();
    }
    lastquestion(i:number){
      if(i==this.questionsArray.length-1){
        return true;
      }
      return false;
    }
    typeofQ(qType: string): string {
      return qType;
    }

    validTypeOfQ(qType: string): boolean {
      return qType === 'MCQ' || qType === 'TOF';
    }
    checkrole(): boolean {
      if (this.role == 'faculty') return true;
      return false;
    }
    reset(){
      this.firstFormGroup.reset();
      this.questionForm.reset();
      this.firstFormGroup.get('facultyIdCtrl')?.setValue(this.facultyId);
      this._snackBar.open('Assessment Successfully Updated', 'Close', {
        duration: 2000,
      });
      location.reload();
    }
    convertstringtoInt(s:any):number{
      return parseInt(s);
    }
  
  }
