import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePostFormDefComponent } from './save-post-form-def.component';

describe('SavePostFormDefComponent', () => {
  let component: SavePostFormDefComponent;
  let fixture: ComponentFixture<SavePostFormDefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavePostFormDefComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavePostFormDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
