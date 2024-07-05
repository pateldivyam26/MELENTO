import { Pipe, PipeTransform } from '@angular/core';
import { Assessment } from '../models/assessment';

@Pipe({
  name: 'searchAssessments'
})
export class SearchAssessmentsPipe implements PipeTransform {

  // transform(items: any[], searchTerm: string): any[] {
  //   if (!items) return [];
  //   if (!searchTerm) return items;

  //   searchTerm = searchTerm.toLowerCase();
  //   return items.filter(item => {
  //     return item.assessmentName.toLowerCase().includes(searchTerm);
  //   });
  // }

  transform(assessments: Assessment[], searchTerm: string): Assessment[] {
    if (!assessments) return [];
    if (!searchTerm) return assessments;

    // searchTerm = searchTerm.toLowerCase();
    return assessments.filter(assessments => {
      return assessments.assessmentName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
    });
  }

}