import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeGateComponent } from './code-gate.component';

describe('CodeGateComponent', () => {
  let component: CodeGateComponent;
  let fixture: ComponentFixture<CodeGateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeGateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeGateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
