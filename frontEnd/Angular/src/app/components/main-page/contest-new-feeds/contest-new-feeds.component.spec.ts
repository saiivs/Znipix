import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestNewFeedsComponent } from './contest-new-feeds.component';

describe('ContestNewFeedsComponent', () => {
  let component: ContestNewFeedsComponent;
  let fixture: ComponentFixture<ContestNewFeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestNewFeedsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContestNewFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
