import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePostComponent } from './save-post.component';

describe('SavePostComponent', () => {
  let component: SavePostComponent;
  let fixture: ComponentFixture<SavePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavePostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
