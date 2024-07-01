import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePostImageComponent } from './save-post-image.component';

describe('SavePostImageComponent', () => {
  let component: SavePostImageComponent;
  let fixture: ComponentFixture<SavePostImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavePostImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavePostImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
