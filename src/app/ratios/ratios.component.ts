import { Component,  TemplateRef, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, MatDialogModule, MatDialogConfig} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RatioServiceService, ratiosServerType } from '../services/ratio-service.service';
import { RatioDetailComponent } from '../ratio-detail/ratio-detail.component';
import { ChartComponent } from '../chart/chart.component';

export interface ratioType {
  year : string;
  revenue: string;
  fte: string
}

@Component({
  selector: 'app-ratios',
  standalone: true,
  imports: [MatTableModule, MatDialogModule, MatFormFieldModule, MatSelectModule, 
    FormsModule, ReactiveFormsModule, ChartComponent ],
  templateUrl: './ratios.component.html',
  styleUrl: './ratios.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RatiosComponent {

  @ViewChild('openYearDialog') openYearDialog: TemplateRef<any>;
  @ViewChild('openRatioDialog') openRatioDialog: TemplateRef<any>;

  constructor(private ratiosService: RatioServiceService,
     public dialog: MatDialog){ 
    
  }

  ngOnInit() {
    this.ratiosService.getRatioDataSource().subscribe((ratios: ratiosServerType[]) => {
      const data: ratioType[] = [];
      ratios.forEach((ratio: ratiosServerType) => {
        data.push({
          year: ratio.year,
          revenue: ratio.revenue,
          fte: ratio.fte
        })
      })
      this.ratiosService.setRatioData(data)
      this.updateTableData();
    })
  }

  // Table Data 
  displayedColumns: string[] = ['year', 'revenue', 'fte']; 
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource<any>();

  // Dialog Form Data
  yearControl = new FormControl('2024' as string);
  ratioControl = new FormControl('revenue' as string)

  /**
   * Update the Data Table
   */
  updateTableData() {
    this.ratiosService.ratios.subscribe(data => this.dataSource.data = data);
  }

  /**
   * Add Year Button click. Add a new row
   */
  addYear() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = {
      width: '500px',
      height: '500px',
    };
    const dialogRef = this.dialog.open(this.openYearDialog, dialogConfig);
  
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dataSource.data = [...this.dataSource.data, {year: result, revenue:"0", fte: "0"}]
        this.ratiosService.setRatioData(this.dataSource.data)
      } 
    })
  }

  /**
   * Add Ratio Button Click. Adds New Column 
   */
  addRatio() {
    const dialogRef = this.dialog.open(this.openRatioDialog,  {
      width: '500px',
      height: '500px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result) {
      this.columnsToDisplay.push(result)
      this.displayedColumns.push(result)
      this.dataSource.data = this.dataSource.data.map(data => ({...data, [result]:0}))
      this.ratiosService.setRatioData(this.dataSource.data)
    }
  })

  }

  /**
   * Remove the table column
   * @param column 
   */
  removeColumn(column: any) {
    this.columnsToDisplay = this.columnsToDisplay.filter(col => col !== column)
    this.displayedColumns = this.displayedColumns.filter((col => col !== column))
    this.dataSource.data.map((data : any) => delete data[column])
    this.ratiosService.setRatioData(this.dataSource.data)
  }
  
  /**
   * Edit Table Row Data
   * @param data 
   */
  editRow(data: any) {
    const dialogRef = this.dialog.open(RatioDetailComponent, {
      data: data,
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      switch(result.cmd) {
        case 'delete': {
          const updatedRatioData = this.dataSource.data.filter((val => val.year !== result.data.year));
          this.ratiosService.setRatioData(updatedRatioData);
          break;
        }
        case 'save': {
          const index = this.dataSource.data.findIndex(data =>data.year === result.data.year)
          this.dataSource.data[index] = result.data
          this.ratiosService.setRatioData(this.dataSource.data);
    
          break;
        }
        default: break;
      }
     
    });
  }
}
