import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation-test-modal',
  templateUrl: './delete-confirmation-test-modal.component.html',
  styleUrls: ['./delete-confirmation-test-modal.component.css']
})
export class DeleteConfirmationTestModalComponent {
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  closeModal(): void {
    this.cancelled.emit();
  }

  acceptModal(): void {
    this.confirmed.emit();

}
}