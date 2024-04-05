import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestsService } from '../requests.service';


@Component({
  selector: 'app-new-request',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-request.component.html',
  styleUrl: './new-request.component.css'
})

export class NewRequestComponent {
  requestsService = inject(RequestsService);

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


  isLoading = false;

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
            // Check the prediction value and show the modal with the appropriate message
          if(response["prediction"] === "0") {
            this.showModal('We recommend this credit.');
          } else if(response["prediction"] === "1") {
            this.showModal('We don’t recommend this credit.');
          } else {
            // Handle unexpected prediction values
            console.error('Unexpected prediction value:', response["prediction"]);
    }
      })
      .catch((error) => {
        console.error(error);
      })
  }

  // Example showModal function implementation
    showModal(message : string) {
      // Your modal display logic here
      console.log('Modal message:', message);
      // For instance, using alert to demonstrate, but you'd replace this with your actual modal display code.
      alert(message);
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
