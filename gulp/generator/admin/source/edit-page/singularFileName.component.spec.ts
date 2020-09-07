import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { <%=nameSingularUC%>Component } from './<%=singularFileName%>.component';

describe('<%=nameSingularUC%>Component', () => {
  let component: <%=nameSingularUC%>Component;
  let fixture: ComponentFixture<<%=nameSingularUC%>Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ <%=nameSingularUC%>Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(<%=nameSingularUC%>Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
