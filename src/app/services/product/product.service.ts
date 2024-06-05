import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iProduct } from 'src/app/models/iproduct';
import { Iproductcard } from 'src/app/models/iproductcard';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl: string = "";
  allProductsUrl: string = "https://api.vitaparapharma.com/api/v3/public/product/all";

  constructor(private _HttpClient: HttpClient) { }

  getSingleProduct(id:number): Observable<any> {
    this.apiUrl = environment.baseUrl + 'v4/public/product/'+id;
    return this._HttpClient.get<any>(this.apiUrl)
  }
  getCategoryListOfProduct(id:number):Observable<any>{
    this.apiUrl = environment.baseUrl + 'v1/public/category/all-lang/'+id;
    return this._HttpClient.get<any>(this.apiUrl)
  }
  getAllProducts(): Observable<iProduct[]> {
    return this._HttpClient.get<iProduct[]>(this.allProductsUrl);
  }

}
