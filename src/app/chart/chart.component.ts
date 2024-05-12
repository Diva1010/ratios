import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { RatioServiceService } from '../services/ratio-service.service';
import {  ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule , ReactiveFormsModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent {

  public chart: any;
  ratioData: any;
  xData: string[];
  filterOptions: string[];

  constructor(
    private ratioService: RatioServiceService,
    private cdref: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.ratioService.ratios.subscribe(ratio => {
      this.ratioData = ratio
      if(ratio[0]) this.filterOptions = Object.keys(this.ratioData[0]).filter(key => key!= 'year');
      this.xData = this.ratioData.map((value: any) => value.year)
      const fte = this.ratioData.map((value: any) => value.fte)
      this.createChart(this.xData, fte, 'fte');     
    })
   
  }

  /**
   * Common function to Create and Update the Chart
   * @param year 
   * @param yData 
   * @param yLabel 
   */
  createChart(year: Array<string>, yData: Array<string>, yLabel: string) {

    // If chart exists, destroy it to update the new values
    if(this.chart) this.chart.destroy();

      this.chart = new Chart("ratioChart", {
        type: 'bar',
  
        data: {
          labels: year, 
           datasets: [
            {
              label: yLabel,
              data: yData,
              backgroundColor: '#2e3e54'
            } 
          ]
        },
        options: {
          aspectRatio:2.5
        }
        
      });   
  }

  /**
   * Update Chart with selected filter value for Y-Axis
   * @param selectedValue 
   */
  updateChart(selectedValue: string) {
    const yData = this.ratioData.map((value: any) => value[selectedValue]);
    this.createChart(this.xData, yData, selectedValue) 
  }
}
