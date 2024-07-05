import { Component } from '@angular/core';
import { AssessmentsService } from '../../services/assessments.service';
import { Assessment } from '../../models/assessment';
import { Packer } from "docx";
import { saveAs } from "file-saver";
import { DocumentCreator} from '../../utils/DocumentCreater';
import svg2img from 'svg2img';
import { Canvg } from 'canvg';

@Component({
  selector: 'app-view-assessment',
  templateUrl: './view-assessment.component.html',
  styleUrl: './view-assessment.component.scss'
})
export class ViewAssessmentComponent {
  arrAssessments:Assessment[]=[]
  constructor(private assessmentService:AssessmentsService){
    this.assessmentService.getAssessments().subscribe(data=>{
      this.arrAssessments=data
    })
  }
  async download(assessment: { assessmentDescription: string, assessmentImage: string, assessmentName: string }) {
    const documentCreator = new DocumentCreator();

    try {
      const response = await fetch(assessment.assessmentImage);
      const svgText = await response.text();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (ctx) {
        const v = await Canvg.fromString(ctx, svgText);
        v.start();
        canvas.toBlob((blob) => {
          if (blob) {
            const reader = new FileReader();
            reader.onload = () => {
              const buffer = reader.result as ArrayBuffer;

              const doc = documentCreator.create(
                assessment.assessmentDescription,
                "Hello lorem ipsum 1111111",
                buffer
              );

              Packer.toBlob(doc).then((docBlob) => {
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
