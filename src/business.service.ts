import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { business } from './app/class/business';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  getAllBusniess()
  {
    return this.http.get<business[]>("http://localhost:60584//api/business/getAllBusniess")
  }
  getBusinessByCategoryCode(t:number)
  {
    return this.http.post<business[]>("http://localhost:60584//api/business/getBusinessByCategoryCode?code="+ t,{body:business})
  }
  



  constructor(public http:HttpClient) { }
}