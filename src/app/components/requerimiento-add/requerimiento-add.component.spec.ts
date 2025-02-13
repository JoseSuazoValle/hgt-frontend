import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerimientoAddComponent } from './requerimiento-add.component';

describe('RequerimientoAddComponent', () => {
  let component: RequerimientoAddComponent;
  let fixture: ComponentFixture<RequerimientoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequerimientoAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequerimientoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
