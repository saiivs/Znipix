import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DilogEditComponent } from './dilog-edit.component';

describe('DilogEditComponent', () => {
  let component: DilogEditComponent;
  let fixture: ComponentFixture<DilogEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DilogEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DilogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
