import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPostFormResultComponent } from './list-post-form-result.component';

describe('ListPostFormResultComponent', () => {
  let component: ListPostFormResultComponent;
  let fixture: ComponentFixture<ListPostFormResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPostFormResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListPostFormResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
