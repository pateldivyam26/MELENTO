import { Component } from '@angular/core';
import { AssessmentScore } from '../../models/assessmentScore';
import { ActivatedRoute, Params } from '@angular/router';
import { AssessmentScoreService } from '../../services/assessment-score.service';
import { Assessment } from '../../models/assessment';
import { AssessmentsService } from '../../services/assessments.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { TraineeService } from '../../services/trainee.service';
import { Trainee } from '../../models/trainee';
@Component({
  selector: 'app-view-charts',
  templateUrl: './view-charts.component.html',
  styleUrl: './view-charts.component.scss'
})

export class ViewChartsComponent {
  score: AssessmentScore = new AssessmentScore(0, 0, 0, 0, 0)
  assessment: Assessment = new Assessment(0, '', '', 0, '', '', [], 0, 0, 0, true)
  chartOptions: any;
  chartOptions_bar: any;
  arrAssessmentsScore: AssessmentScore[] = [];
  traineeId: number = 0;
  arrTrainees: Trainee[] = [];
  tempId: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private scoreService: AssessmentScoreService,
    private assessmentService: AssessmentsService,
    private traineeService: TraineeService
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      var aid = (params['id'])
      this.scoreService.getAssessmentScoreById(aid).subscribe(data => {
        this.score = data;
        this.updateChartOptions();
        this.assessmentService.getAssessmentById(this.score.assessmentId).subscribe(data => {
          this.assessment = data
          this.updateChartOptions();
        });
      })
    })
  }

  updateChartOptions(): void {
    if (this.score && this.assessment) {
      this.chartOptions = {
        animationEnabled: true,
        title: {
          text: "Score vs Remaining Marks"
        },
        data: [{
          type: "pie",
          startAngle: -90,
          indexLabel: "{name}: {y}",
          yValueFormatString: "#,###.##'%'",
          dataPoints: [
            { y: this.score.score, name: "Score" },
            { y: this.assessment.totalMarks - this.score.score, name: "Remaining Marks" }
          ]
        }]
      };
      const assessmentData = this.score.assessmentScore.map((score, index) => ({
        x: index + 1,
        y: score
      }));

      this.chartOptions_bar = {
        title: {
          text: "Question Wise Marks Obtained"
        },
        animationEnabled: true,
        axisY: {
          includeZero: true
        },
        data: [{
          type: "column",
          indexLabelFontColor: "#5A5757",
          dataPoints: assessmentData
        }]
      };
    }
  }
  public captureScreen() {
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
        pdf.save(`Score_${this.assessment.assessmentName}_${this.score.assessmentId}.pdf`);
      }).catch(error => {
        console.error('Error generating PDF: ', error);
      });
    } else {
      console.error('Element not found!');
    }
  }

}
