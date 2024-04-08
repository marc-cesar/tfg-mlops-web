import { Component, Inject, inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { RequestsService } from '../../services/requests.service';


@Component({
  selector: 'app-feedback-modal',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './feedback-modal.component.html',
  styleUrl: './feedback-modal.component.css'
})
export class FeedbackModalComponent {
  requestsService = inject(RequestsService);
  requestId = 0;
  message = '';

  constructor(
    public dialogRef: MatDialogRef<FeedbackModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.message = data.message;
    this.requestId = data.requestId;

    console.log(data);
  }
  

  confirmFeedBack(requestid : string, feedback : boolean) {
    this.requestsService.sendFeedback(requestid, feedback)
      .then((response) => {
        console.log(response);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
