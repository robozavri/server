import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { <%=nameSingularFUC%> } from 'app/shared/models/<%=singularFileName%>';
import { FormComponent } from 'app/shared/components/form.component';
import { FormComponent as _FormComponent } from '../../form/form.component';
import * as _ from 'lodash';<%=modalImportsArea%>

@Component({
  selector: 'app-<%=singularFileName%>-modal',
  templateUrl: './<%=singularFileName%>-modal.component.html',
  styleUrls: ['./<%=singularFileName%>-modal.component.scss']
})
export class <%=nameSingularFUC%>ModalComponent implements OnInit, AfterViewInit {


  showFormWarning = false;
  submitted = false;
  showSubmit = false;
  <%=modalComponentClassPropertiesArea%>

  @ViewChild('<%=nameSingularLC%>Form', { static: false }) <%=nameSingularLC%>FormComponent: _FormComponent;
  <%=modalComponentClassViewChildArea%>

  <%=nameSingularLC%>Type: <%=nameSingularFUC%>;

  constructor(<%=modalComponentClassConstructorArgumentsArea%>
    private dialogRef: MatDialogRef<<%=nameSingularFUC%>ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: <%=nameSingularFUC%>
  ) { }

  formComponents: FormComponent[];

  ngOnInit(): void {
    <%=modalComponentClassOnInitBodyArea%>
  }

  ngAfterViewInit(): void {
    this.formComponents = [
      this.<%=nameSingularLC%>FormComponent,
      <%=modalComponentClassNgAfterViewInitArrayArea%>
    ];
  }

  formsAreValid(): any {
    return this.formComponents.filter(component => component).every((formComponent: FormComponent) => formComponent.formIsValid());
  }

  onFinish(): void {
    this.showFormWarning = false;
    this.submitted = true;
    if (this.formsAreValid()) {
      this.dialogRef.close(this.get<%=nameSingularFUC%>Data());
    } else {
      this.showFormWarning = true;
    }
  }

  get<%=nameSingularFUC%>Data(): any {
    const data = _.cloneDeep(_.merge(
      this.<%=nameSingularLC%>Type,
      this.<%=nameSingularLC%>FormComponent.getFormValue(),
      <%=modalComponentClassFormValuesMergeArea%>
    ));
    return data;
  }

} 
