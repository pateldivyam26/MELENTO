import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Trainee, TraineeAssessment, completedAssessments } from '../../models/trainee';
import { TraineeService } from '../../services/trainee.service';
import { Assessment } from '../../models/assessment';
import { AssessmentsService } from '../../services/assessments.service';
import { Faculty } from '../../models/faculty';
import { FacultyService } from '../../services/faculty.service';
import { AssessmentScore } from '../../models/assessmentScore';
import { AssessmentScoreService } from '../../services/assessment-score.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  arrTrainee: Trainee[] = [];
  trainee: Trainee = new Trainee(0, 0, [new TraineeAssessment(0, 0)], []);
  assessmentDetails: { traineeAssessment: TraineeAssessment, assessment: Assessment }[] = [];
  completedAssessments: { completedAssessment: completedAssessments, assessment: Assessment }[] = [];
  assessment: Assessment = new Assessment(0, '', '', 0, '', '', [], 0, 0, 0, true);
  traineeId: number = 0;
  arrAssessments: Assessment[] = [];
  facultyArrAssessments: Assessment[] = [];
  arrAssessmentScores: AssessmentScore[] = [];
  arrFaculty: Faculty[] = [];
  tempId: string = '';
  facultyId: number = 0;
  role: string = '';
  isCollapsed = false;
  selectedTab: string = 'dashboard'; // Default selected tab
  arrAssessmentScoreMap: { [key: string]: number[] } = {};
  selectedAssessment: Assessment | null = null; // Updated to be of type Assessment
  scatterChart: Chart | undefined;
  traineeAvgScore:number=0;
  FacultyAssessmentTrack: { [key: string]: number[] } = {};
  chartvar:boolean=false;

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  isMobile = true;

  constructor(private traineeService: TraineeService, private assessmentsService: AssessmentsService, private router: Router, private facultyService: FacultyService,
    private assessmentScoreService: AssessmentScoreService, private observer: BreakpointObserver) {
    const tId = localStorage.getItem('id');
    if (tId != null) this.tempId = tId.toString();
    if (this.tempId !== null) {
      this.traineeService.getTrainee().subscribe(data => {
        this.arrTrainee = data;
        for (let i = 0; i < this.arrTrainee.length; i++) {
          if (this.tempId === (this.arrTrainee[i].userId).toString()) {
            this.traineeId = this.arrTrainee[i].id;
          }
        }
        if (this.traineeId != 0) {
          this.traineeService.getTraineeById(this.traineeId).subscribe(data => {
            this.trainee = data;
            this.fetchAssessmentDetails();
            this.populateDataTrainee();

          });
        }
      });
    }
    this.assessmentsService.getAssessments().subscribe(data => {
      this.arrAssessments = data;
      this.facultyService.getFaculty().subscribe(data => {
        this.arrFaculty = data;
        const currole = localStorage.getItem('role');
        const id = localStorage.getItem('id');
        if (currole) { this.role = currole; }
        if (currole === 'faculty') {
          for (let i = 0; i < this.arrFaculty.length; i++) {
            if (Number(this.arrFaculty[i].userId) === Number(id)) {
              this.facultyId = this.arrFaculty[i].id;
              this.getfacultyAssessments();
              this.populateDataFaculty();
              this.renderScatterChartFaculty();
            }
          }
        }
        if (this.role === 'admin') {
          this.assessmentScoreService.getAssessmentScore().subscribe(data => {
            this.arrAssessmentScores = data;
            this.populateDataAdmin();
          });
        }
        if(this.role==='user'){
          this.populateDataTrainee();
        }
      });
    });

    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      this.isMobile = screenSize.matches;
      if (!this.isMobile) {
        this.isCollapsed = false;
      }
    });
  }

  ngOnInit() {
  }

  getfacultyAssessments() {
    if (this.facultyId && this.arrAssessments) {
      this.facultyArrAssessments = [];
      // console.log(this.arrAssessments)
      for (let i = 0; i < this.arrAssessments.length; i++) {
        if (Number(this.arrAssessments[i].facultyId) === Number(this.facultyId)) {
          this.facultyArrAssessments.push(this.arrAssessments[i]);
        }
      }
    }
  }

  fetchAssessmentDetails(): void {
    this.assessmentDetails = [];
    this.completedAssessments = [];
    for (const traineeAssmnt of this.trainee.arrAssessments) {
      this.assessmentsService.getAssessmentById(traineeAssmnt.id).subscribe(assessmentData => {
        this.assessmentDetails.push({
          assessment: assessmentData,
          traineeAssessment: traineeAssmnt
        });
      });
    }
    for (const completedAssmnt of this.trainee.completedAssessments) {
      this.assessmentScoreService.getAssessmentScoreById(completedAssmnt.id).subscribe((data: AssessmentScore) => {
        this.assessmentsService.getAssessmentById(data.assessmentId).subscribe(assessmentData => {
          this.completedAssessments.push({
            assessment: assessmentData,
            completedAssessment: completedAssmnt
          });
        });
      });
    }
  }

  populateDataAdmin() {

    this.arrAssessmentScores.forEach((assessmentScore: AssessmentScore) => {
      const key = assessmentScore.assessmentId.toString();
      if (this.arrAssessmentScoreMap[key]) {
        this.arrAssessmentScoreMap[key].push(assessmentScore.score);
      } else {
        this.arrAssessmentScoreMap[key] = [assessmentScore.score];
      }
    });
    // console.log(this.arrAssessmentScoreMap);
  }
  populateDataTrainee(){
    this.traineeAvgScore = this.calcualteTraineeAvgscore();
    this.renderScatterChartTrainee();
  }
  populateDataFaculty(){
    this.facultyArrAssessments.forEach((assessment: Assessment) => {
      const key = assessment.id.toString();
      this.arrAssessmentScores.forEach((assessmentScore: AssessmentScore) => {
        if (assessmentScore.assessmentId === assessment.id) {
          if (this.FacultyAssessmentTrack[key]) {
            this.FacultyAssessmentTrack[key].push(assessmentScore.score);
          } else {
            this.FacultyAssessmentTrack[key] = [assessmentScore.score];
          }
        }
      });
    })
  }
  displayDetails(aId: number) {
    this.assessmentsService.getAssessmentById(aId).subscribe(data => {
      this.assessment = data;
    });
    this.router.navigate(['viewassessmentdetails/' + aId]);
  }

  takeAssessment(assessmentId: number, index: number): void {
    const traineeAssessment = this.assessmentDetails[index].traineeAssessment;
    if (traineeAssessment.quantity > 0) {
      this.router.navigate(['takeassessment/', assessmentId]);
      traineeAssessment.quantity--;
      if(traineeAssessment.quantity === 0) {
        this.trainee.arrAssessments.splice(index, 1);  //need to check this working
      }
      this.traineeService.updateTrainee(this.trainee).subscribe();
    }
  }

  viewCharts(assessmentscoreId: number): void {
    this.router.navigate(['viewcharts/', assessmentscoreId]);
  }
  renderScatterChartTrainee(){
    if(this.trainee.completedAssessments.length ==0) return;
    const scores = this.trainee.completedAssessments.map((assessment) => assessment.score);
    if (this.scatterChart) {
      this.scatterChart.destroy();
    }
    const scatterChartElement = document.getElementById('scatterChartUser') as HTMLCanvasElement;
    if (!scatterChartElement) {
      console.log('Scatter chart element not found!');
      return;
    }
    // Destroy previous chart instance if exists


    this.scatterChart = new Chart(scatterChartElement, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Scores',
          data: scores.map((score, index) => ({ x: index + 1, y: score })), // Map scores to attempts starting from 1
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Assessments',
            },
            ticks: {
              stepSize: 1, // Ensure the x-axis increments by 1
            }
          },
          y: {
            title: {
              display: true,
              text: 'Score',
            },
            // suggestedMin: 0,
            // suggestedMax: 100,
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const tooltipItem: any = context.raw;
                return `Score: ${tooltipItem.y}`;
              }
            }
          }
        }
      }
    });
  }
  renderScatterChart() {
    if (!this.selectedAssessment) return;
    if(!this.arrAssessmentScoreMap[this.selectedAssessment.id.toString()])return;
    const scores = this.arrAssessmentScoreMap[this.selectedAssessment.id.toString()]; // handle the undefined error
    // console.log(scores);
    const averageScore = this.calculateAverageScore(scores);

    const scatterChartElement = document.getElementById('scatterChart') as HTMLCanvasElement;
    if (!scatterChartElement) return;

    // Destroy previous chart instance if exists
    if (this.scatterChart) {
      this.scatterChart.destroy();
    }
    if(!scores)return;
    this.chartvar=true;

    this.scatterChart = new Chart(scatterChartElement, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Scores',
          data: scores.map((score, index) => ({ x: index + 1, y: score })), // Map scores to attempts starting from 1
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Attempts',
            },
            ticks: {
              stepSize: 1, // Ensure the x-axis increments by 1
            }
          },
          y: {
            title: {
              display: true,
              text: 'Score',
            },
            // suggestedMin: 0,
            // suggestedMax: 100,
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const tooltipItem: any = context.raw;
                return `Score: ${tooltipItem.y}`;
              }
            }
          }
        }
      }
    });

    // Render average score
    const averageScoreElement = document.getElementById('averageScore');
    if (averageScoreElement) {
      averageScoreElement.innerHTML = `Average Score: ${averageScore.toFixed(2)}`;
    }
  }
  renderScatterChartFaculty(){
    if (!this.selectedAssessment) return;
    if(!this.FacultyAssessmentTrack[this.selectedAssessment.id.toString()]) return;
    var scores:number[]=[]
    if(this.FacultyAssessmentTrack[this.selectedAssessment.id.toString()])scores = this.FacultyAssessmentTrack[this.selectedAssessment.id.toString()];
    const scatterChartElement = document.getElementById('scatterChartFaculty') as HTMLCanvasElement;
    if (!scatterChartElement) return;
    const averageScore = this.calculateAverageScore(scores);
    // Destroy previous chart instance if exists
    if (this.scatterChart) {
      this.scatterChart.destroy();
    }
    this.chartvar=true;
    this.scatterChart = new Chart(scatterChartElement, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Scores',
          data: scores.map((score, index) => ({ x: index + 1, y: score })), // Map scores to attempts starting from 1
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(0, 0, 0, 0)',
        }],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Attempts',
            },
            ticks: {
              stepSize: 1, // Ensure the x-axis increments by 1
            }
          },
          y: {
            title: {
              display: true,
              text: 'Score',
            },
            // suggestedMin: 0,
            // suggestedMax: 100,
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const tooltipItem: any = context.raw;
                return `Score: ${tooltipItem.y}`;
              }
            }
          }
        }
      }
    });

    // Render average score
    const averageScoreElement = document.getElementById('averageScore');
    if (averageScoreElement) {
      averageScoreElement.innerHTML = `Average Score: ${averageScore.toFixed(2)}`;
    }
  }

  updateAssessmentStatus(item: Assessment, state: boolean) {
    item.active = state;
    this.assessmentsService.updateAssessment(item).subscribe();
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
  }

  selectTab(tabName: string) {
    if(this.selectedTab=='dashboard' && tabName!='dashboard'){
      this.selectedAssessment=null;
      if (this.scatterChart) {
        this.scatterChart.destroy();
      }
    }
    this.selectedTab = tabName;
    if(this.selectedTab=='dashboard' && this.role=='user') {
      this.populateDataTrainee();}

  }
  calcualteTraineeAvgscore():number{
    let sum = 0;
    this.trainee.completedAssessments.forEach((assessment) => {
      sum += assessment.score;
    });
    return sum / this.trainee.completedAssessments.length;
  }
  calculateAverageScore(scores: number[]): number {
    const sum = scores.reduce((acc, score) => acc + score, 0);
    return sum / scores.length;
  }

  onAssessmentSelect() {
    if (this.scatterChart) {
      this.scatterChart.destroy();
      this.chartvar=false;
      const averageScoreElement = document.getElementById('averageScore');
    if (averageScoreElement) {
      averageScoreElement.innerHTML='';
    }
    }
    if (this.selectedAssessment) {
      if(this.role=='admin')      this.renderScatterChart();
      if(this.role=='faculty')     this.renderScatterChartFaculty();

    }
  }
  viewProgress(){
    this.renderScatterChartTrainee();
  }
}
