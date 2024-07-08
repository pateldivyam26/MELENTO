import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AssessmentsService } from '../../services/assessments.service';
import { Assessment } from '../../models/assessment';
import { Packer } from "docx";
import { saveAs } from "file-saver";
import { DocumentCreator } from '../../utils/DocumentCreater';
import { Canvg } from 'canvg';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-view-assessment',
  templateUrl: './view-assessment.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrls: ['./view-assessment.component.scss']
})
export class ViewAssessmentComponent implements OnInit {
  dataSource = new MatTableDataSource<Assessment>();
  displayedColumns: string[] = ['id', 'assessmentName', 'assessmentDate', 'totalMarks', 'facultyId','active', 'actions'];
  expandedElement: Assessment | null = null;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private assessmentService: AssessmentsService) {}

  ngOnInit() {
    this.assessmentService.getAssessments().subscribe(data => {
      this.dataSource.data = data;
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  toggleRow(element: Assessment) {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  async download(assessment: { 
    assessmentDescription: string; 
    assessmentImage: string; 
    assessmentName: string; 
    facultyId: string;
    totalMarks: number;
    questions: { questionText: string; options: string[]; answer: string }[]
}) {
    const documentCreator = new DocumentCreator();

    try {
        const response = await fetch(assessment.assessmentImage);
        const svgText = await response.text();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (ctx) {
            const v = await Canvg.fromString(ctx, svgText);
            v.start();
            canvas.toBlob(blob => {
                if (blob) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const buffer = reader.result as ArrayBuffer;

                        const doc = documentCreator.create(
                            assessment.assessmentName,
                            new Date().toLocaleString(),
                            assessment.facultyId,
                            assessment.totalMarks,
                            buffer,
                            assessment.questions
                        );

                        Packer.toBlob(doc).then(docBlob => {
                            saveAs(docBlob, `${assessment.assessmentName}.docx`);
                            console.log("Document created successfully");
                        });
                    };
                    reader.readAsArrayBuffer(blob);
                } else {
                    console.error("Failed to convert canvas to Blob");
                }
            }, 'image/png');
        } else {
            console.error("Failed to get canvas context");
        }
    } catch (error) {
        console.error("Failed to load image", error);
    }
}

}
