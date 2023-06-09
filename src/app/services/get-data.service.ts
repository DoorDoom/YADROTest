import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyStorageService } from './currency-storage.service';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  
  currencies="";
  keyAPI:string="6qHVOgKT5L4LGr8uBP5Dm95yh9A7LfH5";
  urlApi=`https://api.apilayer.com/exchangerates_data/latest?symbols=${this.currencies}&base=RUB`


  constructor(private http: HttpClient,public currencyService:CurrencyStorageService,private logger: NGXLogger ) {
   }


  public getCurrencies(): Observable<JSON> {
    let myHeaders = new HttpHeaders({
      'apikey':  this.keyAPI,
    });
    this.currencies=this.currencyService.getCurrencies();
    this.updateUrl();
    this.logger.info("Отправлен запрос на сервер")
    return this.http.get<JSON>(this.urlApi, { headers: myHeaders, responseType: 'json', reportProgress: true});
 }

 public updateUrl() {
  this.urlApi=`https://api.apilayer.com/exchangerates_data/latest?symbols=${this.currencies}&base=RUB`
}


 public setCodeAPI(value: string) {
  this.keyAPI=value;
}

}
