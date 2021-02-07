import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { category } from './app/class/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  getAllCategory(){
    return this.http.get<category[]>("http://localhost:60584//api/category/getAllCategory")
  }


  constructor(public http:HttpClient) { }
}