import { trigger, style, animate, keyframes, transition } from '@angular/animations';

export const typewriterAnimation = trigger('typewriter', [
  transition(':enter', [
    animate('3s linear', keyframes([
      style({ width: '0', overflow: 'hidden', whiteSpace: 'nowrap' }),
      style({ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap' })
    ]))
  ])
]);
