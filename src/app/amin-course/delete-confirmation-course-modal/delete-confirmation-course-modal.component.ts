import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation-course-modal',
  templateUrl: './delete-confirmation-course-modal.component.html',
  styleUrls: ['./delete-confirmation-course-modal.component.css']
})
export class DeleteConfirmationCourseModalComponent {
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  closeModal(): void {
    this.cancelled.emit();
  }

  acceptModal(): void {
    this.confirmed.emit();
  }
}
