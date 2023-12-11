import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDeleteConfirmationUserModalComponent } from './delete-delete-confirmation-user-modal.component';

describe('DeleteDeleteConfirmationUserModalComponent', () => {
  let component: DeleteDeleteConfirmationUserModalComponent;
  let fixture: ComponentFixture<DeleteDeleteConfirmationUserModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDeleteConfirmationUserModalComponent]
    });
    fixture = TestBed.createComponent(DeleteDeleteConfirmationUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
