import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CurrencyItemComponent } from './currency-item.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CurrencyItemComponent', () => {
  let component: CurrencyItemComponent;
  let fixture: ComponentFixture<CurrencyItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyItemComponent ],
      imports: [
        IonicModule.forRoot(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
