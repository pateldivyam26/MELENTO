import { Component, OnInit, OnDestroy, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Params, Route } from '@angular/router';
import { Assessment, Question } from '../../models/assessment'; // Assuming your models are imported correctly
import { AssessmentsService } from '../../services/assessments.service';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { AssessmentScoreService } from '../../services/assessment-score.service';
import { AssessmentScore } from '../../models/assessmentScore';
import { TraineeService } from '../../services/trainee.service';
import { Trainee, completedAssessments } from '../../models/trainee';
import { AttendanceService } from '../../services/attendance.service';
import { Attendance } from '../../models/attendance';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { InstructionsDialogBoxComponent } from '../instructions-dialog-box/instructions-dialog-box.component';
@Component({
  selector: 'app-take-assessment',
  templateUrl: './take-assessment.component.html',
  styleUrls: ['./take-assessment.component.scss']
})
export class TakeAssessmentComponent implements OnInit, OnDestroy {
  assessment: Assessment = new Assessment(0, '', '', 0, '', '', [], 0, 0, 0, true);
  assessmentScore: AssessmentScore = new AssessmentScore(0,0,0,0,0,[]);
  timeLeft: number = 0;
  timeLeftDisplay: string = '';
  interval: any;
  startAssm: boolean = false;
  selectedOptions:string[]=[];
  answersArray:string[] = [];
  submited:boolean=false;
  timeOver:boolean=false;
  traineeScores:number[]=[];
  tabselected:number=0;
  traineeOverallScore:number=0;
  pass:boolean=false;
  arrAssessmentsScores: AssessmentScore[] = [];
  tempId: string = '';
  traineeId: number = 0;
  arrTrainees: Trainee[] = [];
  arrAttendace:Attendance[]=[];
  attendance:Attendance=new Attendance(0,0,0,new Date());
  trainee:Trainee= new Trainee(0,0,[],[])
  last10min:boolean=false;
  assessmentRating:number=0;
  rated:boolean=false;
  readonly dialog = inject(MatDialog);
  constructor(private activatedRoute: ActivatedRoute, private assessmentService: AssessmentsService,private router:Router,private assessmentScoreService:AssessmentScoreService,private traineeService: TraineeService,
    private attendanceService:AttendanceService,private _snackBar: MatSnackBar) {
    this.activatedRoute.params.subscribe((params: Params) => {
      const aid = parseInt(params['id']);
      this.assessmentService.getAssessmentById(aid).subscribe(data => {
        this.assessment = data;
        this.timeLeft = this.assessment.assessmentTime * 60; // convert minutes to seconds
        // this.timeLeft=10;
        this.updateTimeLeftDisplay();
        for(var i=0;i<this.assessment.questions.length;i++){
          if(this.assessment.questions[i].type=='MCQ'){
            this.selectedOptions.push('eeee');
          }
          else{
            this.selectedOptions.push('None');
          }
          this.answersArray.push('');
        }
      });
    });
    this.assessmentScoreService.getAssessmentScore().subscribe(data => {
      this.arrAssessmentsScores = data;
    });
    this.attendanceService.getAttendance().subscribe(data=>{
      this.arrAttendace=data;
    })
    var tId = localStorage.getItem('id');
    if (tId != null) this.tempId = tId.toString();
    if (this.tempId !== null) {
      this.traineeService.getTrainee().subscribe(data => {
        this.arrTrainees = data;
        for (var i = 0; i < this.arrTrainees.length; i++) {
          if (this.tempId === (this.arrTrainees[i].userId).toString()) {
            this.traineeId = this.arrTrainees[i].id;
            this.trainee= this.arrTrainees[i]
            // console.log(this.trainee);
          }
        }
      })
    }
  }

  ngOnInit() {}

  startAssessment() {
    this.startAssm = true;
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.updateTimeLeftDisplay();
      } else {
        this.timeOver=true;
        this.submitAssessment();
        clearInterval(this.interval);
      }
    }, 1000);
  }

  updateTimeLeftDisplay() {
    if(this.timeLeft<=600){
      this.last10min=true;
    }
    if(this.timeLeft==600){
      this._snackBar.open('Last 10 minutes remaining!', 'Close', {
        duration: 5000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    }
    const hours = Math.floor(this.timeLeft / 3600);
    const minutes = Math.floor((this.timeLeft % 3600) / 60);
    const seconds = Math.floor(this.timeLeft % 60);
    this.timeLeftDisplay = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  // Helper method to determine if the question type is valid
  validTypeOfQ(type: string | undefined): boolean {
    return type === 'MCQ' || type === 'TOF';
  }

  // Helper method to get the type of the question
  typeofQ(type: string | undefined): string {
    return type || '';
  }

  // Method to update selected options for MCQ questions
  updateSelectedOptions(i: number, event: any, optionIndex: number,val:string) {
    if(event.checked==true){
      this.selectedOptions[i] = this.selectedOptions[i].substring(0, optionIndex) +val+  this.selectedOptions[i].substring(optionIndex+1, this.selectedOptions[i].length);
    }
    else{
      this.selectedOptions[i] = this.selectedOptions[i].substring(0, optionIndex) + 'e' +  this.selectedOptions[i].substring(optionIndex+1, this.selectedOptions[i].length);
    }
    // console.log(this.selectedOptions[i]);
  }

  // Method to update selected options for TOF questions (single option)
  updateTOFvalue(event:any,i:number){
    this.selectedOptions[i]=event.value;
  }

  // Method to save selected options for the question
  SaveQuestion(index: number, type: string) {
    if(type=="MCQ"){
      var ans='';
      for(var i=0;i<this.selectedOptions[index].length;i++){
        if(this.selectedOptions[index][i]!='e'){
          ans+=String.fromCharCode(i+97);
        }
      }
      this.answersArray[index]=ans;
    }
    else{
      this.answersArray[index]=this.selectedOptions[index];
    }
    if (this.tabselected<this.assessment.questions.length) {
      this.tabselected += 1;
    }
    // console.log('Saved question:', this.answersArray[index]);
  }

  // Method to submit the assessment
  submitAssessment() {
      this.submited=true;
      this.traineeOverallScore=this.calcualteScores();
      this.pass=this.passOrFail(50);
      this.makeAssessmentScore();
      this.makeAttendance();
      this.saveAssessmentScore();
      clearInterval(this.interval);
  }
  addRating(){
    if(this.assessmentRating==0)return;
    if(this.assessment.rating==0){
      this.assessment.rating=this.assessmentRating;
    }
    else this.assessment.rating=this.assessment.rating*(1-((this.traineeOverallScore)/(this.assessment.totalMarks)*0.3))+this.assessmentRating*(this.traineeOverallScore/(this.assessment.totalMarks))*0.3;
    this.assessmentService.updateAssessment(this.assessment).subscribe();
    this.rated=true;
  }
  saveAssessmentScore() {
    console.log(this.trainee);
    this.trainee.completedAssessments = this.trainee.completedAssessments || [];
    this.trainee.completedAssessments.push(new completedAssessments(this.assessmentScore.id, this.traineeOverallScore));
    console.log(this.trainee);
    this.traineeService.updateTrainee(this.trainee).subscribe();
}
  makeAssessmentScore(){
    if(this.arrAssessmentsScores.length==0){
      this.assessmentScore.id=1;
    }
    else
    {
    this.assessmentScore.id=(Number(this.arrAssessmentsScores[this.arrAssessmentsScores.length-1].id)+1)
    }
    this.assessmentScore.traineeId=this.traineeId;
    this.assessmentScore.assessmentId=this.assessment.id;
    this.assessmentScore.score=this.traineeOverallScore;
    this.assessmentScore.assessmentScore=this.traineeScores;
    this.assessmentScore.facultyId=this.assessment.facultyId;
    this.assessmentScore.result=this.pass?"Pass":"Fail";
    console.log(this.assessmentScore);
    this.assessmentScoreService.addAssessmentScore(this.assessmentScore).subscribe();
  }
  makeAttendance(){
    if(this.arrAttendace.length==0){
      this.attendance.id=1;
    }
    else
    {
    this.attendance.id=(Number(this.arrAttendace[this.arrAttendace.length-1].id)+1)
    }
    this.attendance.traineeId=this.traineeId;
    this.attendance.assessmentId=this.assessment.id;
    this.attendance.dateTaken=new Date();
    this.attendanceService.addAttendance(this.attendance).subscribe();
  }
  timeLeftProgrssBar():number{
    return (this.timeLeft/(this.assessment.assessmentTime * 60))*100
  }
  passOrFail(val:number):boolean{
    if(this.traineeOverallScore>=((this.assessment.totalMarks)*val/100)){
      return true;
    }
    return false;
  }
  calcualteScores():number{
    var score=0;
    var indimarks=this.assessment.totalMarks/this.assessment.questions.length;
    // console.log(indimarks);
    for(var i=0;i<this.assessment.questions.length;i++){
      if(this.assessment.questions[i].type=='MCQ'){
        // console.log(this.assessment.questions[i].answer,this.answersArray[i]);
        if(this.answersArray[i].toLowerCase()==this.assessment.questions[i].answer.toLowerCase()){
          this.traineeScores.push(indimarks);
          score+=indimarks;
        }
        else{
          this.traineeScores.push(0);

        }
      }
      else{
        // console.log(this.assessment.questions[i].answer,this.answersArray[i]);
        if(this.answersArray[i].toLowerCase()==this.assessment.questions[i].answer.toLowerCase()){
          this.traineeScores.push(indimarks);
          score+=indimarks;
        }
        else{
          this.traineeScores.push(0);
        }
      }
    }
    return score;
  }
  redirectToDashboard(){
    this.router.navigate(['/dashboard']);
  }
  isAnswerCorrect(question: Question, userAnswer: string): boolean {
    return question.answer === userAnswer;
  }
  public captureReport() {
    var data = document.getElementById("contentToConvert");
    if (data) {
      html2canvas(data).then(canvas => {
        var imgWidth = 190;
        var pageHeight = 297;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL("image/png");
        let pdf = new jspdf("p", "mm", "a4");
        var position = (pageHeight - imgHeight) / 2;

        pdf.addImage(contentDataURL, "PNG", 10, position, imgWidth, imgHeight);
        pdf.save(`Report_${this.assessment.assessmentName}_${this.assessment.id}.pdf`);
      }).catch(error => {
        console.error('Error generating PDF: ', error);
      });
    } else {
      console.error('Element not found!');
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(InstructionsDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
