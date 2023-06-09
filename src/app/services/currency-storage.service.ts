import { Injectable } from '@angular/core';
import { CurrencyData } from '../classes/CurrencyData';
import { Rates } from '../classes/JSONMessage';
import { GetDataService } from './get-data.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyStorageService {

  CurrencyList:CurrencyData[]=[
    {
      value:null,
      difference:'',
      previousValue:null,
      name:"USD",
    } as CurrencyData,
    {
      value:null,
      difference:'',
      previousValue:null,
      name:"EUR",
    } as CurrencyData,
    {
      value:null,
      difference:'',
      previousValue:null,
      name:"GBP",
    } as CurrencyData
]; 
  currencies="EUR,USD,GBP";
  menuCurrencies=["CNY","JPY","TRY"];

  constructor() { }

  deleteCurrency(nameOfCurrency:string){
    this.CurrencyList=this.CurrencyList.filter(element=>element.name!==nameOfCurrency);
    this.deleteCurrencyName(nameOfCurrency);
  }

  addCurrencyName(value:string){
    this.currencies=this.currencies+","+value;
    this.menuCurrencies.splice(this.menuCurrencies.indexOf(value),1);
  }

  deleteCurrencyName(value:string){
    this.currencies=this.currencies.split(","+value).join("");
    this.menuCurrencies.push(value);
  }

  getCurrencies(){
    return this.currencies;
  }

  getCurrencyForMenu(){
    return this.menuCurrencies;
  }

  addNewCurrency(nameOfCurrency:string){
    let newCurrency={
      value:null,
      difference:'',
      previousValue:null,
      name:nameOfCurrency,
    }
    this.CurrencyList.push(newCurrency);
    this.addCurrencyName(nameOfCurrency);
  }

  getList():CurrencyData[]{
    return this.CurrencyList;
  }

  updateCurrencies(listOfChanges:Rates){
    this.CurrencyList=this.CurrencyList.map(currency=>{
      currency.previousValue=currency.value;
      Object.entries(listOfChanges).forEach(([key, value])=>{
        if(key===currency.name){
          currency.value=1/value;
        }
      });
      currency.difference=
        (currency.previousValue===null||currency.value===null)?
        "":
          currency.value-currency.previousValue>0?
          "(+"+(currency.value-currency.previousValue).toFixed(3)+")":
          "("+(currency.value-currency.previousValue).toFixed(3)+")";
      return currency;
  })
}
}
