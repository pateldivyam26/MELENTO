import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showStartingWords'
})
export class ShowStartingWordsPipe implements PipeTransform {

  transform(value: string, limit: number = 10): string {
    if (!value) return '';
    
    let words = value.split(' ');
    if (words.length <= limit) {
      return value;
    }

    return words.slice(0, limit).join(' ') + ' ...';
  }

}
