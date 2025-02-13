import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerimientoViewComponent } from './requerimiento-view.component';

describe('RequerimientoViewComponent', () => {
  let component: RequerimientoViewComponent;
  let fixture: ComponentFixture<RequerimientoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequerimientoViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequerimientoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
