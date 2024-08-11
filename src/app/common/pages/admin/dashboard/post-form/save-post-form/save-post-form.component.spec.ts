import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePostFormComponent } from './save-post-form.component';

describe('SavePostFormComponent', () => {
  let component: SavePostFormComponent;
  let fixture: ComponentFixture<SavePostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavePostFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavePostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
