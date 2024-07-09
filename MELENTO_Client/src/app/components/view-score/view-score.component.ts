import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AssessmentScoreService } from '../../services/assessment-score.service';
import { AssessmentsService } from '../../services/assessments.service';
import { FacultyService } from '../../services/faculty.service';
import { TraineeService } from '../../services/trainee.service';
import { UserService } from '../../services/user.service';
import { AssessmentScore } from '../../models/assessmentScore';
import { Assessment } from '../../models/assessment';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-score',
  templateUrl: './view-score.component.html',
  styleUrls: ['./view-score.component.scss']
})
export class ViewScoreComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'assessmentName', 'traineeName', 'facultName', 'score', 'result', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private scoreService: AssessmentScoreService,
    private assessmentService: AssessmentsService,
    private facultyService: FacultyService,
    private traineeService: TraineeService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchScores();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  async fetchScores() {
    try {
      const scores = await this.scoreService.getAssessmentScore().toPromise();
      if (!scores) {
        console.error('No scores found');
        return;
      }
      const scoreDetailsPromises = scores.map(async (score: AssessmentScore) => {
        const assessment = await this.assessmentService.getAssessmentById(score.assessmentId).toPromise();
        const faculty = await this.facultyService.getFacultyById(score.facultyId).toPromise();
        const trainee = await this.traineeService.getTraineeById(score.traineeId).toPromise();

        let facultyUser: User | undefined;
        let traineeUser: User | undefined;

        if (faculty) {
          facultyUser = await this.userService.getUserById(faculty.userId).toPromise();
        }
        if (trainee) {
          traineeUser = await this.userService.getUserById(trainee.userId).toPromise();
        }

        return {
          id: score.id, // Directly include the score id
          assessmentName: assessment?.assessmentName || 'N/A', // Handle null assessment case
          traineeName: traineeUser ? `${traineeUser.firstName} ${traineeUser.lastName}` : 'N/A',
          facultName: facultyUser ? `${facultyUser.firstName} ${facultyUser.lastName}` : 'N/A',
          score: score.score, // Directly include the score
          result: score.result // Directly include the result
        };
      });

      const scoreDetails = await Promise.all(scoreDetailsPromises);
      this.dataSource.data = scoreDetails;
    } catch (error) {
      console.error('Error fetching score details', error);
    }
  }

  viewReport(id: number) {
    this.router.navigate(['viewcharts/', id]);
  }
}
