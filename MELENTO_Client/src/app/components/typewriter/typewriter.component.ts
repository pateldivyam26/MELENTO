import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import 'zone.js';
import { map } from 'rxjs';
import { TypewriterService } from '../../services/typewriter.service';
@Component({
  selector: 'app-typewriter',
  template: `
    <h1>{{ typedText$ | async }}</h1>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypewriterComponent {
  titles = ['Welcome to Assessment Portal!', 'Unlock Your Potential with Our Comprehensive Assessments!', 'Tailored Assessments to Elevate Your Skills and Knowledge!', 'Join Us and Track Your Progress with Our Interactive Portal!', 'Empowering You to Achieve Academic and Professional Excellence!'];

  private typewriterService = inject(TypewriterService);

  typedText$ = this.typewriterService
    .getTypewriterEffect(this.titles)
    .pipe(map((text) => text));
}
