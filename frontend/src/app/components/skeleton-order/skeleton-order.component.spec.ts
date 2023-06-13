import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonOrderComponent } from './skeleton-order.component';

describe('SkeletonOrderComponent', () => {
  let component: SkeletonOrderComponent;
  let fixture: ComponentFixture<SkeletonOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
