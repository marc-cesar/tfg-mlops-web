import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestsService } from '../../services/requests.service';
import { FeedbackModalComponent } from '../feedback-modal/feedback-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Request } from '../../models/request.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-request',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MatDialogModule, 
    FeedbackModalComponent,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './new-request.component.html',
  styleUrl: './new-request.component.css'
})

export class NewRequestComponent implements OnInit {
  constructor(public dialog: MatDialog, private route: ActivatedRoute){}

  requestsService = inject(RequestsService);

  pageTitle: string = 'Create New Request';  // Default title => CHANGE
  predictionString: string = "We recommend this credit."
  feedbackString: string = "No feedback provided."

  requestForm = new FormGroup({
    field0: new FormControl('', Validators.required),
    field1: new FormControl('', Validators.required),
    field2: new FormControl('', Validators.required),
    field3: new FormControl('', Validators.required),
    field4: new FormControl('', Validators.required),
    field5: new FormControl('', Validators.required),
    field6: new FormControl('', Validators.required),
    field7: new FormControl('', Validators.required),
    field8: new FormControl('', Validators.required),
    field9: new FormControl('', Validators.required),
    field10: new FormControl('', Validators.required),
    field11: new FormControl('', Validators.required),
    field12: new FormControl('', Validators.required),
    field13: new FormControl('', Validators.required),
    field14: new FormControl('', Validators.required),
    field15: new FormControl('', Validators.required),
    field16: new FormControl('', Validators.required),
    field17: new FormControl('', Validators.required),
    field18: new FormControl('', Validators.required),
    field19: new FormControl('', Validators.required),
  });

  requestId = 0;
  isLoading = false;
  requestIdParam = "0";
  request: Request | null = null;
  showElements: boolean = true;

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      // Check if the requestId parameter exists
      this.requestIdParam = params['requestId'];
      if (this.requestIdParam) {
        this.requestsService.getRequestById(this.requestIdParam).subscribe(
          (data : Request) => {
            this.request = data;
            this.updateForm(data)
            this.pageTitle = 'Recommendation ' + this.requestIdParam;
            this.showElements = false;
            this.predictionString = this.request?.prediction === "0" ? "We recommended this credit." : "We didn’t recommend this credit.";
            this.feedbackString = this.request?.feedback === this.request?.prediction ? "The client agreed with our prediction" : "The client didn't agree with our prediction";
          },
          error => { 
            console.error('Error fetching request:', error);
          }
        )
      } else {
        this.resetForm();
        this.requestForm.enable();
        this.pageTitle = 'New Request';
        this.showElements = true
      }
    });
  }


  sendForm() {
    if (this.requestForm.invalid) {
      alert('Please fill out all fields before submitting the form.');
      return;
    }

    console.log('Form submitted')
    const json = this.convertFormGroupToJson(this.requestForm);
    console.log(json);
    this.isLoading = true;
    // Do the post call
    this.requestsService.askForPrediction(json)
      .then((response) => {
        this.isLoading = false;
        this.requestId = response["id"];
            // Check the prediction value and show the modal with the appropriate message
          if(response["prediction"] === "0") {
            this.showModal('We recommend this credit.', this.requestId);
          } else if(response["prediction"] === "1") {
            this.showModal('We don’t recommend this credit.', this.requestId);
          } else {
            // Handle unexpected prediction values
            console.error('Unexpected prediction value:', response["prediction"]);
          }
      })
      .catch((error) => {
        console.error(error);
      })
  }

  private updateForm(data: Request): void {
    Object.keys(data).forEach(key => {
      const control = this.requestForm.controls[key as keyof typeof this.requestForm.controls];
      if (control) {
        control.setValue(data[key as keyof Request]);
        control.disable();
      }
    });
  }

  private resetForm(): void {
    Object.keys(this.requestForm.controls).forEach(field => {
      const control = this.requestForm.get(field);
      control?.setValue('');  // Set each control to an empty string
    });
  }

  // Example showModal function implementation
  showModal(message : string, requestId : number) {
    console.log('Modal message:', message);

    const dialogRef = this.dialog.open(FeedbackModalComponent, {
      width: '250px',
      data: {message: message, requestId: requestId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.callFeedback(result);
      }
    });
  }

  callFeedback(feedback: boolean) {    
    console.log('Feedback:', feedback);
    this.resetForm();
  }

  convertFormGroupToJson(formGroup: FormGroup): { [key: string]: number[] } {
    const result: { [key: string]: number[] } = {};
    
    Object.keys(formGroup.controls).forEach((key, index) => {
      const value = formGroup.get(key)?.value;
      const intValue = parseInt(value, 10);
      
      if (!isNaN(intValue)) {
        // Assign the integer value inside an array to the result object
        result[index.toString()] = [intValue];
      } else {
        // Handle the case where conversion to number fails or isn't applicable
        console.warn(`Value for ${key} is not a number.`);
      }
    });
  
    return result;
  }
  
}