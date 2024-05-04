import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestsService } from '../../services/requests.service';
import { FeedbackModalComponent } from '../feedback-modal/feedback-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Request } from '../../models/request.model';
import { CommonModule, DatePipe, ViewportScroller } from '@angular/common';

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
  providers: [DatePipe],
  templateUrl: './new-request.component.html',
  styleUrl: './new-request.component.css'
})

export class NewRequestComponent implements OnInit {
  constructor(private viewportScroller: ViewportScroller, public dialog: MatDialog, private route: ActivatedRoute, private datePipe : DatePipe){}

  requestsService = inject(RequestsService);

  pageTitle: string = 'New credit assessment';  // Default title => CHANGE
  predictionString: string = "We recommend this credit."
  feedbackString: string = "No feedback provided."

  public formattedDate: string | null = '';

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

  dniForm = new FormGroup({
    'dni': new FormControl('', [Validators.required, Validators.maxLength(9)])
  });

  requestId = 0;
  isLoading = false;
  requestIdParam = "0";
  request: Request | null = null;
  showElements: boolean = true;

  ngOnInit(): void {
    
    this.viewportScroller.scrollToPosition([0, 0]);
    this.route.queryParams.subscribe(params => {
      // Check if the requestId parameter exists
      this.requestIdParam = params['requestId'];
      if (this.requestIdParam) {
        this.requestsService.getRequestById(this.requestIdParam).subscribe(
          (data : any) => {
            this.request = data;
            this.updateForm(data)
            this.dniForm.controls['dni'].setValue(data.client.dni);
            const date = new Date(data.approvalTime);
            this.formattedDate = this.datePipe.transform(date, 'MMM d, yyyy HH:mm:ss');
            this.pageTitle = "Assessment for " + data.client.dni + ' - ' + this.formattedDate;
            this.showElements = false;
            this.predictionString = this.request?.prediction === "0" 
            ? "The system recommended the credit." : "The system didn't recommend the credit.";
            this.feedbackString = (this.request?.feedback == null ? "The user didn't inform the system whether the credit was conceded or not." 
            : this.request?.feedback === this.request?.prediction 
              ? "The user agreed with our decision. " 
              : "The user didn't agree with our decision. ") 
              + (this.request?.feedback == '0' 
                ? "The credit was conceded to the client." 
                : (this?.request?.feedback == '1' ? "The credit was not conceded" : ""));
          },
          error => { 
            console.error('Error fetching request:', error);
          }
        )
      } else {
        this.resetForm();
        this.requestForm.enable();
        this.pageTitle = 'New credit assessment';
        this.showElements = true
        this.dniForm = new FormGroup({
          'dni': new FormControl('', [Validators.required, Validators.maxLength(9)])
        });
      }
    });
  }


  sendForm() {
    if (this.requestForm.invalid || this.dniForm.invalid) {
      alert('Please fill out all fields before submitting the form.');
      return;
    }

    console.log('Form submitted')
    const json = this.convertFormGroupToJson(this.requestForm);
    console.log(json);
    this.isLoading = true;

    const dni = this.dniForm.get('dni')?.value;
    const user = JSON.parse(localStorage.getItem('currentUser') as string)
    this.requestsService.askForPrediction(json, user.token as string, dni as string)
      .then((response) => {
        this.isLoading = false;
        this.requestId = response["id"];
          if(response["prediction"] === "0") {
            this.showModal('We recommend this credit.', this.requestId);
          } else if(response["prediction"] === "1") {
            this.showModal('We don’t recommend this credit.', this.requestId);
          } else {
            console.error('Unexpected prediction value:', response["prediction"]);
          }
      })
      .catch((error) => {
        console.error(error);
      })
  }

  private updateForm(data: any): void {
    Object.keys(data).forEach(key => {
      const fieldName = this.fieldMapping[key];
      if (fieldName) {
        const control = this.requestForm.get(fieldName);
        if (control) {
          control.setValue(data[key as keyof typeof this.requestForm.controls]);
          control.disable();
        }
      }      
    });
    // Disable dni form
    this.dniForm.disable();
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

  validateNumberInput(event: any){
    const input = event.target;
    let value = input.value;
    
    // Replace non-numeric characters except decimal point, minus sign, and 'e' (exponential)
    value = value.replace(/[^0-9e.-]/gi, '');
    
    // Remove extra characters that shouldn't be at the start or in multiple occurrences
    value = value.replace(/^-|e|-/gi, function (match : any, offset : any) {
      // Allow '-' or 'e' only at the start, and '-' can appear after 'e'
      return (match === '-' && offset === 0) || (match === 'e' && offset > 0 && value[offset - 1] !== 'e') ? match : '';
    });
    
    input.value = value;
  }

  fieldMapping: { [key: string]: string } = {
    statusExistingAccount: 'field0',
    monthsDuration: 'field1',
    creditHistory: 'field2',
    purpose: 'field3',
    creditAmount: 'field4',
    savingAccount: 'field5',
    presentEmploymentSince: 'field6',
    installmentPercentage: 'field7',
    statusAndSex: 'field8',
    otherDebtors: 'field9',
    presentResidenceSince: 'field10',
    property: 'field11',
    ageInYears: 'field12',
    otherInstallmentPlans: 'field13',
    housing: 'field14',
    numberOfExistingCredits: 'field15',
    job: 'field16',
    peopleToProvideMaintenance: 'field17',
    telephoneNumber: 'field18',
    foreignWorker: 'field19'
  };
  
}