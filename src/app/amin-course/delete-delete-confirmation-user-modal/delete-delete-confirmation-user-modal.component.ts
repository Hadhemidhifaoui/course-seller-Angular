import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-delete-confirmation-user-modal',
  templateUrl: './delete-delete-confirmation-user-modal.component.html',
  styleUrls: ['./delete-delete-confirmation-user-modal.component.css']
})
export class DeleteDeleteConfirmationUserModalComponent {
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  closeModal(): void {
    this.cancelled.emit();
  }

  acceptModal(): void {
    this.confirmed.emit();
  }
}
