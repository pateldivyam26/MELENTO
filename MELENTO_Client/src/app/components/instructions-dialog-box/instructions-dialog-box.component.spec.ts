import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionsDialogBoxComponent } from './instructions-dialog-box.component';

describe('InstructionsDialogBoxComponent', () => {
  let component: InstructionsDialogBoxComponent;
  let fixture: ComponentFixture<InstructionsDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructionsDialogBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructionsDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
