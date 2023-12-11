import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationCourseModalComponent } from './delete-confirmation-course-modal.component';

describe('DeleteConfirmationCourseModalComponent', () => {
  let component: DeleteConfirmationCourseModalComponent;
  let fixture: ComponentFixture<DeleteConfirmationCourseModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteConfirmationCourseModalComponent]
    });
    fixture = TestBed.createComponent(DeleteConfirmationCourseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
