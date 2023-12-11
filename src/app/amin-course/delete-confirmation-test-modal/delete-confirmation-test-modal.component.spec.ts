import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationTestModalComponent } from './delete-confirmation-test-modal.component';

describe('DeleteConfirmationTestModalComponent', () => {
  let component: DeleteConfirmationTestModalComponent;
  let fixture: ComponentFixture<DeleteConfirmationTestModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteConfirmationTestModalComponent]
    });
    fixture = TestBed.createComponent(DeleteConfirmationTestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
