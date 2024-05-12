import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatioDetailComponent } from './ratio-detail.component';

describe('RatioDetailComponent', () => {
  let component: RatioDetailComponent;
  let fixture: ComponentFixture<RatioDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatioDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RatioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
