import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Trainee, TraineeAssessment } from '../../models/trainee';
import { TraineeService } from '../../services/trainee.service';
import { Assessment } from '../../models/assessment';
import { AssessmentsService } from '../../services/assessments.service';
import { Faculty } from '../../models/faculty';
import { FacultyService } from '../../services/faculty.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  arrTrainee: Trainee[] = [];
  trainee: Trainee = new Trainee(0, 0, [new TraineeAssessment(0, 0)]);
  assessmentDetails: { traineeAssessment: TraineeAssessment, assessment: Assessment }[] = [];
  assessment: Assessment = new Assessment(0, '', '', 0, '', '', [], 0, 0, 0, true)
  traineeId: number = 0;
  arrAssessments: Assessment[] = [];
  facultyArrAssessments: Assessment[] = [];
  arrFaculty:Faculty[]=[];  
  tempId: string = '';
  facultyId:number=0;
  role:string='';
  constructor(private traineeService: TraineeService, private assessmentsService: AssessmentsService, private router: Router,private facultyService:FacultyService) {
    var tId = localStorage.getItem('id');
    if (tId != null) this.tempId = tId.toString();
    if (this.tempId !== null) {
      this.traineeService.getTrainee().subscribe(data => {
        this.arrTrainee = data;
        for (var i = 0; i < this.arrTrainee.length; i++) {
          if (this.tempId === (this.arrTrainee[i].userId).toString()) {
            this.traineeId = this.arrTrainee[i].id;
          }
        }
        this.traineeService.getTraineeById(this.traineeId).subscribe(data => {
          this.trainee = data;
          this.fetchAssessmentDetails();
        })
      })
    }
    this.assessmentsService.getAssessments().subscribe(data => {
      this.arrAssessments = data;
      this.getfacultyAssessments();
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
        this.getfacultyAssessments();
      }
    }
  }
  });
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
  fetchAssessmentDetails(): void {
    this.assessmentDetails = [];
    for (const traineeAssmnt of this.trainee.arrAssessments) {
      this.assessmentsService.getAssessmentById(traineeAssmnt.id).subscribe(assessmentData => {
        this.assessmentDetails.push({
          assessment: assessmentData,
          traineeAssessment: traineeAssmnt
        });
      });
    }
  }
  displayDetails(aId: number) {
    this.assessmentsService.getAssessmentById(aId).subscribe(data => {
      this.assessment = data
    })
    this.router.navigate(['viewassessmentdetails/' + aId])
  }
  takeAssessment(assessmentId: number, index: number): void {
    const traineeAssessment = this.assessmentDetails[index].traineeAssessment;
    if (traineeAssessment.quantity > 0) {
      this.router.navigate(['takeassessment/', assessmentId]);
      traineeAssessment.quantity--;
      this.traineeService.updateTrainee(this.trainee).subscribe();
    }
  }

  viewCharts(assessmentId: number): void {
    this.router.navigate(['viewcharts/', assessmentId]);
  }
  updateAssessmentStatus(item:Assessment,state:boolean){
    item.active=state;
    this.assessmentsService.updateAssessment(item).subscribe();
  }
}