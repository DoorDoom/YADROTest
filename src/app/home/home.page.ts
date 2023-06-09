import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval, mergeMap, take } from 'rxjs';
import { GetDataService } from '../services/get-data.service';
import { CurrencyStorageService } from '../services/currency-storage.service';
import { JSONMessage } from '../classes/JSONMessage';
import { CurrencyData } from '../classes/CurrencyData';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy{

  currencies:string[]=[];
  currencyList:CurrencyData[]=[];
  currentDate = new Date();

  currencyObserver$:Observable<JSON>;
  subscription?: Subscription;


  constructor(  
    public http:GetDataService,
    public currencyService:CurrencyStorageService,
    private logger: NGXLogger) 
  {

    this.currencyObserver$=interval(5000).pipe(
      mergeMap(()=> http.getCurrencies()));

    this.subscription=this.currencyObserver$.subscribe(
      response=>{
        this.currentDate = new Date();
        let temp:JSONMessage=response as unknown as JSONMessage;
        logger.info("Получены данные с сервера: "+JSON.stringify(response));
        currencyService.updateCurrencies(temp.rates);
      },
      error=>{
        error.status==='429'? 
        logger.error("Получена ошибка с сервера: "+ error.message +". Пожалуйста, заментите keyAPI(генерируется на сайте https://apilayer.com/) в файле get-data.service.ts на другое значение."):
        logger.error("Получена ошибка с сервера: "+ error.message);
      }
    )

    this.currencyList=currencyService.getList();
  }

  openMenu(){
    this.currencies=this.currencyService.getCurrencyForMenu();
  }

  refreshMenu(value:string){
    this.currencyService.addNewCurrency(value);
    this.currencies=this.currencyService.getCurrencyForMenu();
    this.currencyList=this.currencyService.getList();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
