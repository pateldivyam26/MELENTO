import { Component } from '@angular/core';
import { AssessmentScoreService } from '../../services/assessment-score.service';
import { AssessmentScore } from '../../models/assessmentScore';
import { Assessment } from '../../models/assessment';
import { AssessmentsService } from '../../services/assessments.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-view-score',
  templateUrl: './view-score.component.html',
  styleUrl: './view-score.component.scss'
})
export class ViewScoreComponent {
  arrAssessmentScores:AssessmentScore[]=[]
  assessment: Assessment = new Assessment(0,'','',0,'','',[],0,0,0, true)
  constructor(private scoreService:AssessmentScoreService, private assessmentService:AssessmentsService, private activatedRoute: ActivatedRoute,){
    this.scoreService.getAssessmentScore().subscribe(data=>{
      this.arrAssessmentScores=data
    })
    this.activatedRoute.params.subscribe((params: Params) => {
      var aid = parseInt(params['id'])
      this.assessmentService.getAssessmentById(aid).subscribe(data=>{
          this.assessment=data
    });
  });
}
}