import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DilogContentComponent } from './dilog-content.component';

describe('DilogContentComponent', () => {
  let component: DilogContentComponent;
  let fixture: ComponentFixture<DilogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DilogContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DilogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
