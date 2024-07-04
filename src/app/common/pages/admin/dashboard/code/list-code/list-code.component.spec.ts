import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCodeComponent } from './list-code.component';

describe('ListCodeComponent', () => {
  let component: ListCodeComponent;
  let fixture: ComponentFixture<ListCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
