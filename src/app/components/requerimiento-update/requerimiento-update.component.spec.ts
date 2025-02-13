import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerimientoUpdateComponent } from './requerimiento-update.component';

describe('RequerimientoUpdateComponent', () => {
  let component: RequerimientoUpdateComponent;
  let fixture: ComponentFixture<RequerimientoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequerimientoUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequerimientoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
