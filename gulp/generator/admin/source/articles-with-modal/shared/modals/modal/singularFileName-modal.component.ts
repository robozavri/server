import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { <%=nameSingularFUC%> } from 'app/shared/models/<%=singularFileName%>';
import { FormComponent } from 'app/shared/components/form.component';
import { FormComponent as _FormComponent } from '../../form/form.component';
import * as _ from 'lodash';
<%=MetaModalImports%>
<%=modalImports%>

@Component({
  selector: 'app-<%=singularFileName%>-modal',
  templateUrl: './<%=singularFileName%>-modal.component.html',
  styleUrls: ['./<%=singularFileName%>-modal.component.scss']
})
export class <%=nameSingularFUC%>ModalComponent implements OnInit, AfterViewInit {

  <%=MetaModalClassProperties%>
  filesToCreate: any[] = []; // remove
  filesToDestroy: any[] = []; // remove 
  showFormWarning = false;
  submitted = false;
  showSubmit = false;
  <%=modalClassProperties%>

  @ViewChild('<%=nameSingularLC%>Form', { static: false }) <%=nameSingularLC%>FormComponent: _FormComponent;
  <%=MetaModalViewChild%>

  <%=nameSingularLC%>Type: <%=nameSingularFUC%>;

  constructor(
    <%=modalConstructorArgumentsArea%>
    private dialogRef: MatDialogRef<<%=nameSingularFUC%>ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: <%=nameSingularFUC%>
  ) { }

  formComponents: FormComponent[];

  ngOnInit(): void {
    <%=MetaModalOnInitBody%>

    <%=modalOnInitBody%>
  }

  ngAfterViewInit(): void {
    this.formComponents = [
      this.<%=nameSingularLC%>FormComponent,
      <%=MetaModalNgAfterViewInit%>
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
      <%=MetaModalMerge%>
      this.<%=nameSingularLC%>FormComponent.getFormValue(),
    ));
    return data;
  }

} 
