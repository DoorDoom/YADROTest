import { Component, Input, OnInit } from '@angular/core';
import { CurrencyData } from '../classes/CurrencyData';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-currency-item',
  templateUrl: './currency-item.component.html',
  styleUrls: ['./currency-item.component.scss'],
})
export class CurrencyItemComponent  implements OnInit {

  @Input()  currency:CurrencyData ={} as CurrencyData;

  constructor(private logger: NGXLogger) { 
  }

  ngOnInit() {
    this.logger.info("Создан элемент с данными для "+this.currency.name+" валюты");
  }

}
