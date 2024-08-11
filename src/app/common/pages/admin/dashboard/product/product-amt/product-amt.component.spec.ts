import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAmtComponent } from './product-amt.component';

describe('ProductAmtComponent', () => {
  let component: ProductAmtComponent;
  let fixture: ComponentFixture<ProductAmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductAmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
