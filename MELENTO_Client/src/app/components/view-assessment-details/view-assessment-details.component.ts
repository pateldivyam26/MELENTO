import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AssessmentCard } from '../../models/assessmentCard';
import { AssessmentsService } from '../../services/assessments.service';
import { Assessment } from '../../models/assessment';

@Component({
  selector: 'app-view-assessment-details',
  templateUrl: './view-assessment-details.component.html',
  styleUrl: './view-assessment-details.component.scss'
})
export class ViewAssessmentDetailsComponent {
  assessment: Assessment = new Assessment(0,'','',0,'','',[],0,0,0, true)
  constructor(private activatedRoute: ActivatedRoute, private assessmentService:AssessmentsService) {
    this.activatedRoute.params.subscribe((params: Params) => {
      // console.log(params['id'])
      var aid = parseInt(params['id'])
      this.assessmentService.getAssessmentById(aid).subscribe(data=>{
        this.assessment=data})
      // this.assessment = this.assessmentService.getAssessmentById(aid)
      // console.log(this.assessment)
    })
  }
}