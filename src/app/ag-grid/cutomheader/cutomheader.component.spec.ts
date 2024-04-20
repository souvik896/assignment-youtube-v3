import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutomheaderComponent } from './cutomheader.component';

describe('CutomheaderComponent', () => {
  let component: CutomheaderComponent;
  let fixture: ComponentFixture<CutomheaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CutomheaderComponent]
    });
    fixture = TestBed.createComponent(CutomheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
