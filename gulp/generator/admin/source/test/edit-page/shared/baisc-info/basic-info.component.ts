import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { <%=nameSingularFUC%> } from 'app/shared/models/<%=singularFileName%>';
import { FormComponent as _FormComponent } from '../../../../../../shared/components/form.component';
<%=formComponentImporArea%>

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent extends _FormComponent implements OnInit {

  <%=formComponentClassInputArea%>
  @Input() formData: <%=nameSingularFUC%>;
  @Input() showSubmit = true;
  @Output() submitForm = new EventEmitter<<%=nameSingularFUC%>>();


 
  form: FormGroup;
  <%=formComponentClassPropertiesArea%>

  constructor(
    private fb: FormBuilder,
    <%=formComponentClassConstructorArgumentsArea%>
  ) {
    super();
  }

  ngOnInit(): void {

    <%=formComponentClassOnInitBodyArea%>

    this.form = this.fb.group({<%=formComponentFormGroupArea%>
    });
  }

  <%=formComponentClassBodyArea%>

  submit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
