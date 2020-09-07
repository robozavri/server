import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { <%=namePluralFUC%>Component } from './<%=pluralFileName%>.component';

describe('<%=namePluralFUC%>Component', () => {
  let component: <%=namePluralFUC%>Component;
  let fixture: ComponentFixture<<%=namePluralFUC%>Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ <%=namePluralFUC%>Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(<%=namePluralFUC%>Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
