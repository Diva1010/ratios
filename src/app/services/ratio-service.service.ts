import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';

export interface ratiosServerType {
  year : string;
  revenue: string;
  fte: string
}

@Injectable({
  providedIn: 'root'
})
export class RatioServiceService {

  private ratioData = new BehaviorSubject<any[]>([]); 
  public ratios = this.ratioData.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Get Ratio Data from API 
   * @returns ratiosServerType[]
   */
  getRatioDataSource() {
    return this.http.get<ratiosServerType[]>("http://localhost:4200/assets/data.json");
  }

  /**
   * set ratio Subject data 
   * @param ratioData 
   */
  setRatioData(ratioData: any) {
    this.ratioData.next(ratioData)
  }

  getRatiodata() {
    return this.ratioData
  }
}
