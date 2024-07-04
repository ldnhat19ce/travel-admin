import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveProductImageComponent } from './save-product-image.component';

describe('SaveProductImageComponent', () => {
  let component: SaveProductImageComponent;
  let fixture: ComponentFixture<SaveProductImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveProductImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveProductImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
