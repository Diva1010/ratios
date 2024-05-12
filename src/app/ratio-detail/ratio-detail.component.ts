import { Component, Inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { KeyValuePipe } from '@angular/common';
import { RatiosComponent, ratioType } from '../ratios/ratios.component';
import {FormBuilder , FormsModule, FormGroup, FormControl} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RatioServiceService } from '../services/ratio-service.service';

@Component({
  selector: 'app-ratio-detail',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule ,
    NgFor, KeyValuePipe],
  templateUrl: './ratio-detail.component.html',
  styleUrl: './ratio-detail.component.scss'
})
export class RatioDetailComponent {

  ratioData: any;
 
  constructor(
    public dialogRef: MatDialogRef<RatiosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ratioService: RatioServiceService
  ) {
    this.ratioData = JSON.parse(JSON.stringify(data));
  }   

  updateValue(key: any, data: any) {
    this.ratioData[key] = data
  }
}
