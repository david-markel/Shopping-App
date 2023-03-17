import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsYouWillLikeComponent } from './items-you-will-like.component';

describe('ItemsYouWillLikeComponent', () => {
  let component: ItemsYouWillLikeComponent;
  let fixture: ComponentFixture<ItemsYouWillLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsYouWillLikeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsYouWillLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
